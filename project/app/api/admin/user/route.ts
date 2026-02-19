import { NextResponse } from "next/server";
import { createClient as createServiceClient } from "@supabase/supabase-js";
import { createClient as createServerClient } from "@/lib/supabase/server";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const ADMIN_EMAILS = process.env.ADMIN_EMAILS;

export async function GET(req: Request) {
  try {
    //Provjera logina
    const server = await createServerClient();
    const {
      data: { user },
    } = await server.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    //Provjera admin whitelist
    if (!ADMIN_EMAILS) {
      return NextResponse.json(
        { success: false, error: "Admin config missing" },
        { status: 500 }
      );
    }

    const adminList = ADMIN_EMAILS.split(",").map((e) => e.trim());
    if (!adminList.includes(user.email ?? "")) {
      return NextResponse.json(
        { success: false, error: "Forbidden" },
        { status: 403 }
      );
    }

    //email
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { success: false, error: "Email is required" },
        { status: 400 }
      );
    }

    if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
      return NextResponse.json(
        { success: false, error: "Supabase config missing" },
        { status: 500 }
      );
    }

    // admin pristup bazi
    const svc = createServiceClient(SUPABASE_URL, SERVICE_ROLE_KEY);

    const { data, error } = await svc
      .from("profiles")
      .select("id, email, first_name, last_name, can_create_venue")
      .eq("email", email)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user: data,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}