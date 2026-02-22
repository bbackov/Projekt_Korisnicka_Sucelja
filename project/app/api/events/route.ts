import { NextResponse } from "next/server";
import { createClient as createServiceClient } from "@supabase/supabase-js";
import { createClient as createServerClient } from "@/lib/supabase/server";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function GET(req: Request) {
  if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
    return NextResponse.json(
      { events: [], error: "Missing Supabase config" },
      { status: 500 }
    );
  }

  try {
    const url = new URL(req.url);
    const venueId = url.searchParams.get("venueId");

    const svc = createServiceClient(SUPABASE_URL, SERVICE_ROLE_KEY);

    let query = svc.from("events").select("*");

    // 🔹 ako postoji venueId -> filtriraj
    if (venueId) {
      query = query.eq("venue_id", venueId);
    }

    const { data, error } = await query.order("vrijeme", { ascending: true });

    if (error) {
      return NextResponse.json(
        { events: [], error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ events: data ?? [] });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { events: [], error: message },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const server = await createServerClient();
    const {
      data: { user },
    } = await server.auth.getUser();

    if (!user) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

    const supabaseUrl = SUPABASE_URL;
    const serviceRoleKey = SERVICE_ROLE_KEY;
    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json({ success: false, error: "Missing Supabase config" }, { status: 500 });
    }

    const body = await req.json();
    const { aktivnost, lokacija, vrijeme, kapacitet, tip, opis, venueId } = body;

    const svc = createServiceClient(supabaseUrl, serviceRoleKey);
    const insert = {
      aktivnost,
      lokacija,
      vrijeme,
      prijavljeno: 0,
      kapacitet,
      tip,
      opis,
      venue_id: venueId ?? null,
      created_by: user.id,
    };

    const { data, error } = await svc.from("events").insert(insert).select().single();
    if (error) return NextResponse.json({ success: false, error: error.message }, { status: 500 });

    if (venueId) {
      const { data: venue } = await svc
        .from("venues")
        .select("aktivni_eventovi")
        .eq("id", venueId)
        .single();
    
      const next = Math.max(0, Number(venue?.aktivni_eventovi ?? 0) + 1);
    
      await svc
        .from("venues")
        .update({ aktivni_eventovi: next })
        .eq("id", venueId);
    }

    return NextResponse.json({ success: true, event: data });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

