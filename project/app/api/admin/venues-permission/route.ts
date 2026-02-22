import { NextResponse } from "next/server";
import { createClient as createServiceClient } from "@supabase/supabase-js";
import { createClient as createServerClient } from "@/lib/supabase/server";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

async function requireAdmin() {
  const server = await createServerClient();
  const {
    data: { user },
    error: userErr,
  } = await server.auth.getUser();

  if (userErr || !user) {
    return { ok: false as const, status: 401, error: "Unauthorized", user: null };
  }

  const { data: prof, error: profErr } = await server
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single();

  if (profErr || !prof?.is_admin) {
    return { ok: false as const, status: 403, error: "Forbidden", user };
  }

  return { ok: true as const, status: 200, error: null, user };
}

export async function POST(req: Request) {
  try {
    // Admin check
    const adminCheck = await requireAdmin();
    if (!adminCheck.ok) {
      return NextResponse.json(
        { success: false, error: adminCheck.error },
        { status: adminCheck.status }
      );
    }

    if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
      return NextResponse.json(
        { success: false, error: "Supabase config missing" },
        { status: 500 }
      );
    }

    const body = await req.json().catch(() => null);
    const userId = body?.userId;
    const allowed = body?.allowed;

    if (typeof userId !== "string" || userId.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "userId is required" },
        { status: 400 }
      );
    }
    if (typeof allowed !== "boolean") {
      return NextResponse.json(
        { success: false, error: "allowed must be boolean" },
        { status: 400 }
      );
    }

    // Update permission (service role)
    const svc = createServiceClient(SUPABASE_URL, SERVICE_ROLE_KEY);

    const { data, error } = await svc
      .from("profiles")
      .update({ can_create_venue: allowed })
      .eq("id", userId)
      .select("id, email, first_name, last_name, can_create_venue, is_admin")
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