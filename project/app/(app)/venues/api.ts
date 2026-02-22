// app/(app)/venues/api.ts
import type { Venue } from "./data";
import type { SportTip } from "@/components/common/ui/sportTypes";

type CreateVenueInput = {
  naziv: string;
  adresa: string;
  opis: string;
  sportovi: SportTip[];   // ✅ umjesto sportoviText
  file: File | null;
};

export async function createVenue(input: CreateVenueInput): Promise<Venue> {
  const fd = new FormData();
  fd.append("naziv", input.naziv);
  fd.append("adresa", input.adresa);
  fd.append("opis", input.opis);

  // ✅ pošalji array kao JSON string
  fd.append("sportovi", JSON.stringify(input.sportovi));

  if (input.file) fd.append("file", input.file);

  const res = await fetch("/api/venues", {
    method: "POST",
    body: fd,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.error || "Greška");
  }

  const v = data.venue;

  return {
    id: v.id,
    naziv: v.naziv,
    adresa: v.adresa,
    opis: v.opis ?? "",
    sportovi: v.sportovi ?? [],
    aktivnosti: v.aktivnosti ?? 0,
    slika: v.slika ?? "/venues/default.jpg",
  };
}