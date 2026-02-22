import { NextResponse } from "next/server";
import { createClient as createServiceClient } from "@supabase/supabase-js";
import { createClient as createServerClient } from "@/lib/supabase/server";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Helper: provjeri je li trenutno prijavljeni user admin (iz profiles.is_admin)
async function requireAdmin() {
  const server = await createServerClient();
  const {
    data: { user },
    error: userErr,
  } = await server.auth.getUser();

  if (userErr || !user) {
    return { ok: false as const, status: 401, error: "Unauthorized", user: null };
  }

  // Čitaj iz baze (RLS: user smije čitati svoj profil)
  const { data: prof, error: profErr } = await server
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single();

  if (profErr) {
    // tipično: nema profila ili RLS blokira
    return { ok: false as const, status: 403, error: "Forbidden", user };
  }

  if (!prof?.is_admin) {
    return { ok: false as const, status: 403, error: "Forbidden", user };
  }

  return { ok: true as const, status: 200, error: null, user };
}

export async function GET(req: Request) {
  try {
    // Admin check (iz baze)
    const adminCheck = await requireAdmin();
    if (!adminCheck.ok) {
      return NextResponse.json(
        { success: false, error: adminCheck.error },
        { status: adminCheck.status }
      );
    }

    // query param email
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    if (!email) {
      return NextResponse.json(
        { success: false, error: "Email is required" },
        { status: 400 }
      );
    }

    // Service role za dohvat bilo kojeg profila (admin-only endpoint)
    if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
      return NextResponse.json(
        { success: false, error: "Supabase config missing" },
        { status: 500 }
      );
    }

    const svc = createServiceClient(SUPABASE_URL, SERVICE_ROLE_KEY);

    const { data, error } = await svc
      .from("profiles")
      .select("id, email, first_name, last_name, can_create_venue, is_admin")
      .eq("email", email)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, user: data });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}