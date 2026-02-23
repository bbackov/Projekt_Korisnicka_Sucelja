import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { createClient as createServiceClient } from "@supabase/supabase-js";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const cookieStore = await cookies();

    // ✅ Anon client za čitanje (RLS + session cookies)
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
          set(name: string, value: string, options: any) {
            cookieStore.set({ name, value, ...options });
          },
          remove(name: string, options: any) {
            cookieStore.set({ name, value: "", ...options });
          },
        },
      }
    );

    const { data, error } = await supabase
      .from("venues")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const venue = {
      id: data.id,
      naziv: data.naziv,
      adresa: data.adresa,
      opis: data.opis ?? "",
      sportovi: data.aktivnosti ?? [],
      aktivnosti: (data.aktivnosti ?? []).length,
      slika: data.slika ?? "/venues/default.jpg",
    };

    return NextResponse.json({ venue }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Greška" }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: venueId } = await params;

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !anonKey || !serviceKey) {
      return NextResponse.json(
        { success: false, error: "Missing Supabase config" },
        { status: 500 }
      );
    }

    const cookieStore = await cookies();

    // 1) Anon client za auth (uz session cookies)
    const server = createServerClient(supabaseUrl, anonKey, {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: any) {
          cookieStore.set({ name, value: "", ...options });
        },
      },
    });

    const {
      data: { user },
      error: userErr,
    } = await server.auth.getUser();

    if (userErr || !user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    // 2) Service client za DB operacije (ali sve provjere radimo ručno!)
    const svc = createServiceClient(supabaseUrl, serviceKey);

    // 3) Provjeri je li admin
    const { data: prof, error: profErr } = await svc
      .from("profiles")
      .select("is_admin")
      .eq("id", user.id)
      .single();

    if (profErr) {
      return NextResponse.json(
        { success: false, error: profErr.message },
        { status: 500 }
      );
    }

    const isAdmin = Boolean(prof?.is_admin);

    // 4) Dohvati venue i ownera
    const { data: venue, error: venueErr } = await svc
      .from("venues")
      .select("id, autor_lokacije_id")
      .eq("id", venueId)
      .single();

    if (venueErr || !venue) {
      return NextResponse.json(
        { success: false, error: "Not found" },
        { status: 404 }
      );
    }

    const isOwner = venue.autor_lokacije_id === user.id;

    if (!isAdmin && !isOwner) {
      return NextResponse.json(
        { success: false, error: "Forbidden" },
        { status: 403 }
      );
    }

    // 5) Provjeri ima li eventova na tom venue-u (aktivnost = postoji barem jedan event)
    const { count, error: countErr } = await svc
      .from("events")
      .select("id", { count: "exact", head: true })
      .eq("venue_id", venueId);

    if (countErr) {
      return NextResponse.json(
        { success: false, error: countErr.message },
        { status: 500 }
      );
    }

    if ((count ?? 0) > 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Ne možeš obrisati lokaciju jer ima barem jedan termin (event).",
        },
        { status: 409 }
      );
    }

    // 6) Delete venue
    const { error: delErr } = await svc.from("venues").delete().eq("id", venueId);

    if (delErr) {
      return NextResponse.json(
        { success: false, error: delErr.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}