export interface SportDogadjaj {
  id: number;
  aktivnost: string;
  lokacija: string;
  vrijeme: string;
  prijavljeno: number;
  kapacitet: number;
  ikona: string;
  opis: string;
}

export const SPORT_DOGADJAJI: SportDogadjaj[] = [
  { id: 1, aktivnost: "Mali nogomet (6 na 6)", lokacija: "Srednjaci, betonsko igralište", vrijeme: "Subota, 18:00", prijavljeno: 10, kapacitet: 12, ikona: "⚽", opis: "Fali nam dvoje ljudi za ozbiljan nogomet na male golove. Svi su dobrodošli!" },
  { id: 2, aktivnost: "Ulični Basket", lokacija: "Vukovarska, igralište kod raketa", vrijeme: "Danas, 17:30", prijavljeno: 6, kapacitet: 6, ikona: "🏀", opis: "Ekipa je skupljena, ali dođite ako netko odustane ili za idući termin." },
  { id: 3, aktivnost: "Lagano trčanje", lokacija: "Nasip kod Boćarskog", vrijeme: "Nedjelja, 09:00", prijavljeno: 14, kapacitet: 40, ikona: "🏃", opis: "Ruta od 7km, lagani tempo 6:00 min/km. Idemo do Jaruna i nazad." },
  { id: 4, aktivnost: "Odbojka na pijesku", lokacija: "Jarun, južna strana", vrijeme: "Petak, 16:00", prijavljeno: 3, kapacitet: 4, ikona: "🏐", opis: "Trebamo četvrtu osobu za miješani par. Razina: srednja." },
  { id: 5, aktivnost: "Šah u parku", lokacija: "Trg Franje Tuđmana", vrijeme: "Svaki dan, 10:00", prijavljeno: 4, kapacitet: 10, ikona: "♟️", opis: "Donosimo ploče, vi donesite dobru volju i malo znanja." },
  { id: 6, aktivnost: "Jutarnja Yoga", lokacija: "Maksimir, livada kod vidikovca", vrijeme: "Subota, 08:30", prijavljeno: 22, kapacitet: 30, ikona: "🧘", opis: "Besplatan sat yoge na otvorenom. Ponesite svoju prostirku." },
  { id: 7, aktivnost: "Stolni tenis", lokacija: "Park mladenaca, Siget", vrijeme: "Danas, 14:00", prijavljeno: 1, kapacitet: 2, ikona: "🏓", opis: "Tražim nekoga za par setova, imam reket viška." },
  { id: 8, aktivnost: "Rolanje", lokacija: "Jarun, staza za role", vrijeme: "Utorak, 19:00", prijavljeno: 5, kapacitet: 15, ikona: "🛼", opis: "Zajednički krug oko Jaruna, lagani tempo i druženje." },
  { id: 9, aktivnost: "Badminton", lokacija: "Bundek, zapadna livada", vrijeme: "Srijeda, 17:00", prijavljeno: 2, kapacitet: 4, ikona: "🏸", opis: "Imamo mrežu i rekete, tražimo još jedan par za igru." },
  { id: 10, aktivnost: "Street Workout", lokacija: "Velesajam, otvoreni gym", vrijeme: "Četvrtak, 18:00", prijavljeno: 4, kapacitet: 8, ikona: "💪", opis: "Zajednički trening snage, učimo nove elemente na šipkama." },
  { id: 11, aktivnost: "Nogomet 5 na 5", lokacija: "Prečko, umjetna trava", vrijeme: "Danas, 20:00", prijavljeno: 10, kapacitet: 10, ikona: "⚽", opis: "Termin je popunjen, hvala svima!" },
  { id: 12, aktivnost: "Bicikliranje na Sljeme", lokacija: "Gračani, parking žičara", vrijeme: "Nedjelja, 10:00", prijavljeno: 8, kapacitet: 20, ikona: "🚴", opis: "Uspon cestom do vrha, kava na Puntijarki pa spust." },
  { id: 13, aktivnost: "Zumba na otvorenom", lokacija: "Park Ribnjak", vrijeme: "Ponedjeljak, 19:00", prijavljeno: 12, kapacitet: 25, ikona: "💃", opis: "Besplatan trening za sve uzraste uz dobru glazbu." },
  { id: 14, aktivnost: "Pikado turnir", lokacija: "Kvartovski kafić, Dubrava", vrijeme: "Subota, 20:00", prijavljeno: 8, kapacitet: 16, ikona: "🎯", opis: "Amatersko druženje uz pikado. Prijave do subote popodne." },
  { id: 15, aktivnost: "Plivanje", lokacija: "Bazen Utrina", vrijeme: "Danas, 07:00", prijavljeno: 3, kapacitet: 10, ikona: "🏊", opis: "Ranojutarnje plivanje prije posla, zajednička traka." },
  { id: 16, aktivnost: "Kuglanje (Hobby)", lokacija: "Zaprešić, staza", vrijeme: "Utorak, 18:00", prijavljeno: 4, kapacitet: 6, ikona: "🎳", opis: "Druženje uz kuglanje, plaća se samo najam staze po osobi." },
  { id: 17, aktivnost: "Skate Session", lokacija: "Mimara, ispred muzeja", vrijeme: "Srijeda, 16:00", prijavljeno: 5, kapacitet: 12, ikona: "🛹", opis: "Vježbamo nove trikove, svi nivoi su dobrodošli." },
  { id: 18, aktivnost: "Tai Chi", lokacija: "Park dr. Franje Tuđmana", vrijeme: "Četvrtak, 07:30", prijavljeno: 10, kapacitet: 15, ikona: "🧘‍♂️", opis: "Lagane vježbe disanja i pokreta za početak dana." },
  { id: 19, aktivnost: "Planinarenje Bikčevićeva", lokacija: "Bliznec, početak staze", vrijeme: "Subota, 09:00", prijavljeno: 25, kapacitet: 50, ikona: "🥾", opis: "Standardna ruta do Puntijarke. Tempo prilagođen svima." },
  { id: 20, aktivnost: "Tenis zid", lokacija: "Ravnice, tenis zidovi", vrijeme: "Danas, 15:00", prijavljeno: 1, kapacitet: 2, ikona: "🎾", opis: "Tražim nekoga za vježbanje udaraca na zidu." },
  { id: 21, aktivnost: "Frizbi na livadi", lokacija: "Bundek, kod jezera", vrijeme: "Nedjelja, 16:00", prijavljeno: 4, kapacitet: 10, ikona: "🥏", opis: "Ultimate frisbee osnove i samo bacanje u krug." },
  { id: 22, aktivnost: "Borilačke vještine osnove", lokacija: "Velesajam, dvorana 4", vrijeme: "Ponedjeljak, 20:00", prijavljeno: 6, kapacitet: 12, ikona: "🥋", opis: "Besplatan ogledni trening karatea i samoobrane." },
  { id: 23, aktivnost: "Nogomet (Veterani)", lokacija: "Pongračevo", vrijeme: "Utorak, 21:00", prijavljeno: 12, kapacitet: 12, ikona: "⚽", opis: "Stalna ekipa 40+, tražimo zamjenu samo ako se netko ozlijedi." },
  { id: 24, aktivnost: "Rukometni trening", lokacija: "Kutija Šibica", vrijeme: "Srijeda, 19:30", prijavljeno: 9, kapacitet: 14, ikona: "🤾", opis: "Rekreativni rukomet, vježbamo akcije i igramo na kraju." },
  { id: 25, aktivnost: "Boks na vreći", lokacija: "Gym na otvorenom, Jarun", vrijeme: "Četvrtak, 18:00", prijavljeno: 2, kapacitet: 4, ikona: "🥊", opis: "Kružni trening s fokusom na tehniku udaraca." },
  { id: 26, aktivnost: "Pilates", lokacija: "Livada kod Boćarskog", vrijeme: "Petak, 08:00", prijavljeno: 15, kapacitet: 20, ikona: "🧘‍♀️", opis: "Vježbe snage i fleksibilnosti, donesite prostirku." },
  { id: 27, aktivnost: "Penjanje na stijeni", lokacija: "Velesajam (unutarnja)", vrijeme: "Subota, 11:00", prijavljeno: 4, kapacitet: 6, ikona: "🧗", opis: "Osiguravanje partnera, tražimo nekoga tko zna s užetom." },
  { id: 28, aktivnost: "Kros trening", lokacija: "Park šuma Jelenovac", vrijeme: "Nedjelja, 17:00", prijavljeno: 7, kapacitet: 15, ikona: "🏃‍♂️", opis: "Trčanje po šumskim stazama s usponima." },
  { id: 29, aktivnost: "Biljar 8-ball", lokacija: "Metropolis Club", vrijeme: "Danas, 21:00", prijavljeno: 2, kapacitet: 4, ikona: "🎱", opis: "Igramo parove, opuštena atmosfera uz glazbu." },
  { id: 30, aktivnost: "Nordijsko hodanje", lokacija: "Dotrščina", vrijeme: "Subota, 09:30", prijavljeno: 10, kapacitet: 20, ikona: "🦯", opis: "Šetnja sa štapovima kroz šumu uz instruktora." },
  { id: 31, aktivnost: "Kartanje (Bela)", lokacija: "Park u Travnom", vrijeme: "Danas, 16:00", prijavljeno: 3, kapacitet: 4, ikona: "🃏", opis: "Trebamo četvrtog za partiju bele na klupici." },
  { id: 32, aktivnost: "Košarka (šutiranje)", lokacija: "Kvartovska igrališta, Dugave", vrijeme: "Srijeda, 18:00", prijavljeno: 2, kapacitet: 5, ikona: "🏀", opis: "Samo vježbamo šut i igramo 'Put oko svijeta'." },
  { id: 33, aktivnost: "Veslanje", lokacija: "Jarun, veslački klub", vrijeme: "Petak, 07:00", prijavljeno: 4, kapacitet: 8, ikona: "🚣", opis: "Rekreativno veslanje u osmercu, potrebna osnovna vještina." },
  { id: 34, aktivnost: "Gimnastika osnove", lokacija: "Otvoreni gym Jarun", vrijeme: "Ponedjeljak, 17:00", prijavljeno: 5, kapacitet: 10, ikona: "🤸", opis: "Vježbamo stoj na rukama i zvijezdu." },
  { id: 35, aktivnost: "Nogomet za djecu", lokacija: "Lanište, park", vrijeme: "Subota, 10:00", prijavljeno: 15, kapacitet: 20, ikona: "🧒", opis: "Roditelji organiziraju utakmicu za klince iz kvarta." },
  { id: 36, aktivnost: "Streličarstvo", lokacija: "Poljana u šumi, Črnomerec", vrijeme: "Nedjelja, 14:00", prijavljeno: 2, kapacitet: 4, ikona: "🏹", opis: "Privatni rekviziti, samo za ljude s vlastitom opremom." },
  { id: 37, aktivnost: "Slacklining", lokacija: "Zrinjevac, između drveća", vrijeme: "Danas, 15:30", prijavljeno: 3, kapacitet: 8, ikona: "👣", opis: "Hodanje po traci, dođite isprobati ravnotežu." },
  { id: 38, aktivnost: "Fitnes za umirovljenike", lokacija: "Dom kulture Peščenica", vrijeme: "Utorak, 09:00", prijavljeno: 18, kapacitet: 25, ikona: "👴", opis: "Lagane vježbe razgibavanja i socijalizacija." },
  { id: 39, aktivnost: "Sakupljanje smeća (Plogging)", lokacija: "Nasip", vrijeme: "Subota, 11:00", prijavljeno: 10, kapacitet: 100, ikona: "🚮", opis: "Trčimo i sakupljamo smeće. Spojimo korisno s ugodnim." },
  { id: 40, aktivnost: "Noćna vožnja biciklom", lokacija: "Trg bana Jelačića", vrijeme: "Petak, 22:00", prijavljeno: 15, kapacitet: 50, ikona: "🚲", opis: "Krug po gradu kad nema prometa. Obavezna svjetla!" },
];