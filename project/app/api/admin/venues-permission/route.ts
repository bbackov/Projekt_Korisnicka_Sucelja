import { NextResponse } from "next/server";
import { createClient as createServiceClient } from "@supabase/supabase-js";
import { createClient as createServerClient } from "@/lib/supabase/server";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const ADMIN_EMAILS = process.env.ADMIN_EMAILS;

function isAdmin(email: string | null | undefined) {
  if (!email || !ADMIN_EMAILS) return false;
  const adminList = ADMIN_EMAILS.split(",").map((e) => e.trim()).filter(Boolean);
  return adminList.includes(email);
}

export async function POST(req: Request) {
  try {
    //Auth: mora biti prijavljen
    const server = await createServerClient();
    const {
      data: { user },
    } = await server.auth.getUser();

    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    //Admin provjera
    if (!ADMIN_EMAILS) {
      return NextResponse.json({ success: false, error: "Admin config missing" }, { status: 500 });
    }

    if (!isAdmin(user.email)) {
      return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
    }

    // Supabase config
    if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
      return NextResponse.json({ success: false, error: "Supabase config missing" }, { status: 500 });
    }

    // Body: userId + allowed
    const body = await req.json().catch(() => null);
    const userId = body?.userId;
    const allowed = body?.allowed;

    if (typeof userId !== "string" || userId.trim().length === 0) {
      return NextResponse.json({ success: false, error: "userId is required" }, { status: 400 });
    }
    if (typeof allowed !== "boolean") {
      return NextResponse.json({ success: false, error: "allowed must be boolean" }, { status: 400 });
    }

    // Update permission
    const svc = createServiceClient(SUPABASE_URL, SERVICE_ROLE_KEY);
    const { data, error } = await svc
      .from("profiles")
      .update({ can_create_venue: allowed })
      .eq("id", userId)
      .select("id, email, first_name, last_name, can_create_venue")
      .single();

    if (error || !data) {
      return NextResponse.json(
        { success: false, error: error?.message ?? "Update failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, user: data });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}