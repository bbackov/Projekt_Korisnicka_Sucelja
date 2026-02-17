import { NextResponse } from "next/server";
import { createClient as createServiceClient } from "@supabase/supabase-js";
import { createClient as createServerClient } from "@/lib/supabase/server";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL");
}

export async function GET() {
  if (!SERVICE_ROLE_KEY || !SUPABASE_URL) {
    const { SPORT_DOGADJAJI } = await import("@/app/(app)/termini/data");
    return NextResponse.json({ events: SPORT_DOGADJAJI });
  }

  try {
    const svc = createServiceClient(SUPABASE_URL, SERVICE_ROLE_KEY);
    const { data, error } = await svc.from("events").select("*");
    if (error) {
      return NextResponse.json({ events: [], error: error.message }, { status: 500 });
    }

    return NextResponse.json({ events: data ?? [] });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ events: [], error: message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const server = await createServerClient();
    const {
      data: { user },
    } = await server.auth.getUser();

    if (!user) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

    if (!SERVICE_ROLE_KEY) {
      return NextResponse.json({ success: false, error: "Missing service role key" }, { status: 500 });
    }

    const body = await req.json();
    const { aktivnost, lokacija, vrijeme, kapacitet, tip, opis, venueId } = body;

    const svc = createServiceClient(SUPABASE_URL, SERVICE_ROLE_KEY);
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
      await svc
        .from("venues")
        .update({ aktivnosti: svc.raw("aktivnosti + 1") as unknown as number })
        .eq("id", venueId);
    }

    return NextResponse.json({ success: true, event: data });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
