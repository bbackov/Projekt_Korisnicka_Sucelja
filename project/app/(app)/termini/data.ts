import { SportTip } from "@/components/common/ui/sportTypes";

export interface SportDogadjaj {
  id: number;
  aktivnost: string;
  lokacija: string;
  vrijeme: string;
  prijavljeno: number;
  kapacitet: number;
  tip: SportTip;
  opis: string;
  venue_id?: string | null; // ako ti treba kasnije
}

export async function getDogadaji(): Promise<SportDogadjaj[]> {
  const res = await fetch("/api/events", { cache: "no-store" });
  const data = await res.json();

  if (!res.ok) throw new Error(data?.error || "Greška");

  return (data.events ?? []) as SportDogadjaj[];
}