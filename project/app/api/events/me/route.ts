import { NextResponse } from "next/server";
import { createClient as createServiceClient } from "@supabase/supabase-js";
import { createClient as createServerClient } from "@/lib/supabase/server";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function GET() {
  try {
    const server = await createServerClient();
    const {
      data: { user },
    } = await server.auth.getUser();

    if (!user) {
      return NextResponse.json({ success: true, registered: [] });
    }

    if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
      return NextResponse.json(
        { success: false, error: "Supabase configuration is missing", registered: [] },
        { status: 500 },
      );
    }

    const svc = createServiceClient(SUPABASE_URL, SERVICE_ROLE_KEY);
    const { data, error } = await svc.from("registrations").select("event_id").eq("user_id", user.id);

    if (error) {
      return NextResponse.json({ success: false, error: error.message, registered: [] }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      registered: (data || [])
        .map((row: { event_id: number | string }) => Number(row.event_id))
        .filter((eventId) => Number.isFinite(eventId) && eventId > 0),
    });
  } catch (err: unknown) {
    console.error("getMyRegistrations error:", err);
    return NextResponse.json({ success: false, registered: [] }, { status: 500 });
  }
}
