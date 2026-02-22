import { NextResponse } from "next/server";
import { createClient as createServiceClient } from "@supabase/supabase-js";
import { createClient as createServerClient } from "@/lib/supabase/server";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

function toValidEventId(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value) && value > 0) {
    return Math.trunc(value);
  }

  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!/^\d+$/.test(trimmed)) {
      return null;
    }
    const parsed = Number(trimmed);
    if (!Number.isFinite(parsed) || parsed <= 0) {
      return null;
    }
    return Math.trunc(parsed);
  }

  return null;
}

export async function POST(req: Request, { params }: { params: { eventId: string } | Promise<{ eventId: string }> }) {
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

    const resolvedParams = await Promise.resolve(params);
    const paramEventId = toValidEventId(resolvedParams?.eventId);

    let bodyEventId: number | null = null;
    try {
      const body = await req.json();
      bodyEventId = toValidEventId(body?.eventId);
    } catch {
      bodyEventId = null;
    }

    const eventId = paramEventId ?? bodyEventId;
    if (!eventId) {
      return NextResponse.json({ success: false, error: "Invalid event id" }, { status: 400 });
    }

    const svc = createServiceClient(SUPABASE_URL, SERVICE_ROLE_KEY);

    const { data: deletedRows, error: deleteErr } = await svc
      .from("registrations")
      .delete()
      .eq("event_id", eventId)
      .eq("user_id", user.id)
      .select("id");

    if (deleteErr) {
      return NextResponse.json({ success: false, error: deleteErr.message }, { status: 500 });
    }

    if (!deletedRows || deletedRows.length === 0) {
      return NextResponse.json({ success: true });
    }

    const { count, error: countErr } = await svc
  .from("registrations")
  .select("*", { count: "exact", head: true })
  .eq("event_id", eventId);

  if (!countErr) {
    await svc.from("events").update({ prijavljeno: count ?? 0 }).eq("id", eventId);
  }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    console.error("Unregister error:", err);
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
