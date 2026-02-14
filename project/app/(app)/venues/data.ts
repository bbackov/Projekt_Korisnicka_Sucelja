export interface Venue {
  id: number;
  naziv: string;
  adresa: string;
  opis: string;
  slika: string;
  sportovi: string[];
  aktivnosti: number;
}

export const VENUES: Venue[] = [
  {
    id: 1,
    naziv: "Jarun",
    adresa: "Jarun, Zagreb",
    opis: "Popularno rekreacijsko središte s jezerom, plažom, stazama za trčanje, veslanje, rolanje i odbojku na pijesku. Idealno za sportove na otvorenom.",
    slika: "/venues/jarun.jpg",
    sportovi: ["Odbojka", "Rolanje", "Boks", "Veslanje"],
    aktivnosti: 4,
  },
  {
    id: 2,
    naziv: "Maksimir",
    adresa: "Park Maksimir, Zagreb",
    opis: "Najveći i najstariji park u Zagrebu, savršen za jutarnju jogu, meditaciju i vježbe na svježem zraku okruženi prirodom.",
    slika: "/venues/maksimir.jpg",
    sportovi: ["Yoga"],
    aktivnosti: 1,
  },
  {
    id: 3,
    naziv: "Bundek",
    adresa: "Bundek, Zagreb",
    opis: "Zelena oaza s jezerom i otvorenim livadama za badminton, frizbi i različite rekreacijske aktivnosti.",
    slika: "/venues/bundek.jpg",
    sportovi: ["Badminton", "Frizbi"],
    aktivnosti: 2,
  },
  {
    id: 4,
    naziv: "Velesajam",
    adresa: "Velesajam, Zagreb",
    opis: "Urbani prostor s otvorenim gym-om i fitness stanicama za street workout, penjanje i borilačke vještine.",
    slika: "/venues/velesajam.jpg",
    sportovi: ["Street Workout", "Borilačke vještine", "Penjanje"],
    aktivnosti: 3,
  },
  {
    id: 5,
    naziv: "Park Ribnjak",
    adresa: "Park Ribnjak, Zagreb",
    opis: "Šarmantni zeleni park u centru grada, savršen za zumbu i grupne vježbe na otvorenom.",
    slika: "/venues/ribnjak.jpg",
    sportovi: ["Zumba"],
    aktivnosti: 1,
  },
  {
    id: 6,
    naziv: "Srednjaci",
    adresa: "Srednjaci, Zagreb",
    opis: "Betonsko igralište za mali nogomet i ulične sportove. Omiljeno okupljanje za lokalne ekipe.",
    slika: "/venues/srednjaci.jpg",
    sportovi: ["Mali nogomet"],
    aktivnosti: 1,
  },
  {
    id: 7,
    naziv: "Zrinjevac",
    adresa: "Trg Nikole Šubića Zrinskog, Zagreb",
    opis: "Elegantni park u centru Zagreba s drvoredima, fontanom i prostorima za slacklining i opuštanje.",
    slika: "/venues/zrinjevac.jpg",
    sportovi: ["Slacklining"],
    aktivnosti: 1,
  },
  {
    id: 8,
    naziv: "Prečko",
    adresa: "Prečko, Zagreb",
    opis: "Moderno igralište s umjetnom travom za mali nogomet 5 na 5. Reflektori za večernje termine.",
    slika: "/venues/precko.jpg",
    sportovi: ["Nogomet 5 na 5"],
    aktivnosti: 1,
  },
  {
    id: 9,
    naziv: "Gračani",
    adresa: "Gračani, Zagreb",
    opis: "Polazna točka za bicikliranje i planinarenje na Medvednicu. Parking kod žičare za organiziranje tura.",
    slika: "/venues/gracani.jpg",
    sportovi: ["Bicikliranje"],
    aktivnosti: 1,
  },
  {
    id: 10,
    naziv: "Ravnice",
    adresa: "Ravnice, Zagreb",
    opis: "Rekreacijski teniski tereni za vježbanje udaraca i opuštenu igru tenisa.",
    slika: "/venues/ravnice.jpg",
    sportovi: ["Tenis"],
    aktivnosti: 1,
  },
  {
    id: 11,
    naziv: "Nasip kod Boćarskog",
    adresa: "Nasip, Zagreb",
    opis: "Popularna staza za trčanje uz rijeku Savu. Ravna i pogodna za lagano trčanje i plogging.",
    slika: "/venues/nasip.jpg",
    sportovi: ["Trčanje", "Plogging"],
    aktivnosti: 2,
  },
  {
    id: 12,
    naziv: "Vukovarska",
    adresa: "Vukovarska ulica, Zagreb",
    opis: "Otvoreno betonsko igralište za ulični basket. Poznato okupljanje košarkaša.",
    slika: "/venues/default.jpg",
    sportovi: ["Košarka"],
    aktivnosti: 1,
  },
  {
    id: 13,
    naziv: "Trg Franje Tuđmana",
    adresa: "Trg dr. Franje Tuđmana, Zagreb",
    opis: "Prostor za šah u parku i jutarnje tai chi vježbe. Mirna atmosfera za opuštajuće aktivnosti.",
    slika: "/venues/default.jpg",
    sportovi: ["Šah", "Tai Chi"],
    aktivnosti: 2,
  },
  {
    id: 14,
    naziv: "Park mladenaca, Siget",
    adresa: "Park mladenaca, Siget, Zagreb",
    opis: "Mali park s mogućnošću igranja stolnog tenisa na otvorenom.",
    slika: "/venues/default.jpg",
    sportovi: ["Stolni tenis"],
    aktivnosti: 1,
  },
  {
    id: 15,
    naziv: "Bazen Utrina",
    adresa: "Bazen Utrina, Zagreb",
    opis: "Bazen za ranojutarnje plivanje i rekreativne aktivnosti u vodi.",
    slika: "/venues/default.jpg",
    sportovi: ["Plivanje"],
    aktivnosti: 1,
  },
  {
    id: 16,
    naziv: "Boćarski dom",
    adresa: "Boćarski dom, Zagreb",
    opis: "Prostor za pilates i grupne fitness aktivnosti. Pogodan za organizirane treninge.",
    slika: "/venues/default.jpg",
    sportovi: ["Pilates"],
    aktivnosti: 1,
  },
  {
    id: 17,
    naziv: "Kutija Šibica",
    adresa: "Kutija Šibica, Zagreb",
    opis: "Sportska dvorana za rukometne treninge i rekreativne utakmice.",
    slika: "/venues/default.jpg",
    sportovi: ["Rukomet"],
    aktivnosti: 1,
  },
  {
    id: 18,
    naziv: "Bliznec",
    adresa: "Bliznec, Zagreb",
    opis: "Početna točka za planinarenje na Medvednici. Standardna ruta do Puntijarke.",
    slika: "/venues/default.jpg",
    sportovi: ["Planinarenje"],
    aktivnosti: 1,
  },
  {
    id: 19,
    naziv: "Črnomerec",
    adresa: "Črnomerec, Zagreb",
    opis: "Lokacija za streličarstvo s prostorom za vježbanje na otvorenom.",
    slika: "/venues/default.jpg",
    sportovi: ["Streličarstvo"],
    aktivnosti: 1,
  },
  {
    id: 20,
    naziv: "Peščenica",
    adresa: "Peščenica, Zagreb",
    opis: "Lokacija za lagane fitness vježbe, posebno prilagođeno starijim osobama.",
    slika: "/venues/default.jpg",
    sportovi: ["Fitness"],
    aktivnosti: 1,
  },
];

export async function getVenues(): Promise<Venue[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(VENUES);
    }, 500);
  });
}
