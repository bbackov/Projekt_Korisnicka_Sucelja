import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
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