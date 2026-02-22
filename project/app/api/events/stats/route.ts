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

    const userId = user?.id ?? null;

    if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
      return NextResponse.json(
        { success: false, error: "Supabase configuration is missing" },
        { status: 500 }
      );
    }

    const svc = createServiceClient(SUPABASE_URL, SERVICE_ROLE_KEY);

    // 1) ukupno termina (global)
    const { count: totalEvents, error: totalErr } = await svc
      .from("events")
      .select("*", { count: "exact", head: true });

    if (totalErr) {
      return NextResponse.json(
        { success: false, error: totalErr.message },
        { status: 500 }
      );
    }

    // 2) koliko se user prijavio (personal)
    let mySignups = 0;
    if (userId) {
      const { count: myCount, error: myErr } = await svc
        .from("registrations")
        .select("*", { count: "exact", head: true })
        .eq("user_id", userId);

      if (myErr) {
        return NextResponse.json(
          { success: false, error: myErr.message },
          { status: 500 }
        );
      }
      mySignups = myCount ?? 0;
    }

    // 3) najpopularniji sport (global) po broju PRIJAVA:
    // registrations JOIN events -> tip
    const { data: regRows, error: regErr } = await svc
      .from("registrations")
      .select("id, events!inner(tip)");

    if (regErr) {
      return NextResponse.json(
        { success: false, error: regErr.message },
        { status: 500 }
      );
    }

    const counter: Record<string, number> = {};
    for (const row of regRows ?? []) {
      const tip = (row as any)?.events?.tip;
      if (!tip || typeof tip !== "string") continue;
      counter[tip] = (counter[tip] ?? 0) + 1;
    }

    let mostPopular: string | null = null;
    let mostPopularCount = 0;

    for (const [tip, cnt] of Object.entries(counter)) {
      if (cnt > mostPopularCount) {
        mostPopularCount = cnt;
        mostPopular = tip;
      }
    }

    return NextResponse.json({
      success: true,
      totalEvents: totalEvents ?? 0,
      mySignups,
      mostPopular,          
      mostPopularCount,     
    });
  } catch (err: unknown) {
    console.error("Stats error:", err);
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}