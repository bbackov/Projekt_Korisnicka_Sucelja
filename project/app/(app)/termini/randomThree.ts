import { SportDogadjaj } from "./data";

export async function RandomThree(): Promise<SportDogadjaj[]> {
  const res = await fetch("/api/events", { cache: "no-store" });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.error || "Greška pri dohvaćanju događaja");
  }

  const events: SportDogadjaj[] = data.events ?? [];

  
  const filteredSports = events.filter(
    (sport) => sport.prijavljeno < sport.kapacitet
  );

 
  return filteredSports
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);
}