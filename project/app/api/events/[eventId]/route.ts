import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { createClient as createServiceClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function DELETE(
  _req: Request,
  { params }: { params: { eventId: string } }
) {
  try {
    const eventId = Number(params.eventId);

    if (!SUPABASE_URL || !ANON_KEY || !SERVICE_ROLE_KEY) {
      return NextResponse.json(
        { success: false, error: "Missing Supabase config" },
        { status: 500 }
      );
    }

    if (!Number.isFinite(eventId)) {
      return NextResponse.json(
        { success: false, error: "Invalid event id" },
        { status: 400 }
      );
    }

    // Auth user from cookies (RLS session)
    const cookieStore = await cookies();
    const server = createServerClient(SUPABASE_URL, ANON_KEY, {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set() {},
        remove() {},
      },
    });

    const {
      data: { user },
    } = await server.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Service client for DB ops
    const svc = createServiceClient(SUPABASE_URL, SERVICE_ROLE_KEY);

    // admin check
    const { data: prof, error: profErr } = await svc
      .from("profiles")
      .select("is_admin")
      .eq("id", user.id)
      .single();

    if (profErr) {
      return NextResponse.json(
        { success: false, error: profErr.message },
        { status: 500 }
      );
    }

    const isAdmin = Boolean(prof?.is_admin);

    // event ownership
    const { data: ev, error: evErr } = await svc
      .from("events")
      .select("id, created_by, venue_id")
      .eq("id", eventId)
      .single();

    if (evErr || !ev) {
      return NextResponse.json(
        { success: false, error: "Not found" },
        { status: 404 }
      );
    }

    const isOwner = ev.created_by === user.id;

    if (!isAdmin && !isOwner) {
      return NextResponse.json(
        { success: false, error: "Forbidden" },
        { status: 403 }
      );
    }

    // Delete registrations first (FK safety)
    const { error: regErr } = await svc
      .from("registrations")
      .delete()
      .eq("event_id", eventId);

    if (regErr) {
      return NextResponse.json(
        { success: false, error: regErr.message },
        { status: 500 }
      );
    }

    // Delete event
    const { error: delErr } = await svc
      .from("events")
      .delete()
      .eq("id", eventId);

    if (delErr) {
      return NextResponse.json(
        { success: false, error: delErr.message },
        { status: 500 }
      );
    }

    // Optional: keep venue counter consistent (ako ga koristiš)
    if (ev.venue_id) {
      const { data: venue } = await svc
        .from("venues")
        .select("aktivni_eventovi")
        .eq("id", ev.venue_id)
        .single();

      const next = Math.max(0, Number(venue?.aktivni_eventovi ?? 0) - 1);

      await svc
        .from("venues")
        .update({ aktivni_eventovi: next })
        .eq("id", ev.venue_id);
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}