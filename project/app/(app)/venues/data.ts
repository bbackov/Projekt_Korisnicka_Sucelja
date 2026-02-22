export interface Venue {
  id: string; 
  naziv: string;
  adresa: string;
  opis: string;
  slika: string;
  sportovi: string[];
  aktivnosti: number;
}

export async function getVenues() {
  const res = await fetch("/api/venues", { cache: "no-store" });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.error || "Greška");
  }

  return data.venues as Venue[];
}