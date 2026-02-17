import { NextResponse } from "next/server";
import { createClient as createServiceClient } from "@supabase/supabase-js";
import { createClient as createServerClient } from "@/lib/supabase/server";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function POST(req: Request) {
  try {
    const server = await createServerClient();
    const {
      data: { user },
    } = await server.auth.getUser();

    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
      return NextResponse.json(
        { success: false, error: "Supabase configuration is missing" },
        { status: 500 },
      );
    }

    const body = await req.json();
    const eventId = Number(body?.eventId);
    if (!Number.isFinite(eventId) || eventId <= 0) {
      return NextResponse.json({ success: false, error: "Invalid event id" }, { status: 400 });
    }

    const svc = createServiceClient(SUPABASE_URL, SERVICE_ROLE_KEY);

    const { data: event, error: eventErr } = await svc
      .from("events")
      .select("id,kapacitet,prijavljeno")
      .eq("id", eventId)
      .single();

    if (eventErr || !event) {
      return NextResponse.json({ success: false, error: "Event not found" }, { status: 404 });
    }

    const { data: existing, error: existingErr } = await svc
      .from("registrations")
      .select("id")
      .eq("event_id", eventId)
      .eq("user_id", user.id)
      .limit(1);

    if (existingErr) {
      return NextResponse.json({ success: false, error: existingErr.message }, { status: 500 });
    }
    if (existing && existing.length > 0) {
      return NextResponse.json({ success: false, error: "Already registered" }, { status: 400 });
    }

    if (event.prijavljeno >= event.kapacitet) {
      return NextResponse.json({ success: false, error: "Full" }, { status: 400 });
    }

    const { error: insertErr } = await svc
      .from("registrations")
      .insert({ event_id: eventId, user_id: user.id });

    if (insertErr) {
      if (insertErr.code === "23505") {
        return NextResponse.json({ success: false, error: "Already registered" }, { status: 400 });
      }
      return NextResponse.json({ success: false, error: insertErr.message }, { status: 500 });
    }

    const { error: updateErr } = await svc
      .from("events")
      .update({ prijavljeno: Math.max(0, (event.prijavljeno ?? 0) + 1) })
      .eq("id", eventId);

    if (updateErr) {
      return NextResponse.json({ success: false, error: updateErr.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, eventId });
  } catch (err: unknown) {
    console.error("Register error:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 },
    );
  }
}
