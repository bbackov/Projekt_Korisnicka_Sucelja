import { SportTip } from "@/components/common/ui/sportTypes";

export interface SportDogadjaj {
  id: number;
  aktivnost: string;
  lokacija: string;
  vrijeme: string;
  prijavljeno: number;
  kapacitet: number;
  tip:SportTip;
  opis: string;
}

export const SPORT_DOGADJAJI: SportDogadjaj[] = [
  { id: 1, aktivnost: "Mali nogomet (6 na 6)", tip: "FOOTBALL", lokacija: "Srednjaci, betonsko igralište", vrijeme: "Subota, 18:00", prijavljeno: 10, kapacitet: 12, opis: "Fali nam dvoje ljudi za ozbiljan nogomet na male golove." },
  { id: 2, aktivnost: "Ulični Basket", tip: "BASKETBALL", lokacija: "Vukovarska, igralište kod raketa", vrijeme: "Danas, 17:30", prijavljeno: 6, kapacitet: 6, opis: "Ekipa je skupljena, ali dođite ako netko odustane." },
  { id: 3, aktivnost: "Lagano trčanje", tip: "RUNNING", lokacija: "Nasip kod Boćarskog", vrijeme: "Nedjelja, 09:00", prijavljeno: 14, kapacitet: 40, opis: "Ruta od 7km, lagani tempo." },
  { id: 4, aktivnost: "Odbojka na pijesku", tip: "VOLLEYBALL", lokacija: "Jarun, južna strana", vrijeme: "Petak, 16:00", prijavljeno: 3, kapacitet: 4, opis: "Trebamo četvrtu osobu za miješani par." },
  { id: 5, aktivnost: "Šah u parku", tip: "CHESS", lokacija: "Trg Franje Tuđmana", vrijeme: "Svaki dan, 10:00", prijavljeno: 4, kapacitet: 10, opis: "Donosimo ploče, vi donesite dobru volju." },
  { id: 6, aktivnost: "Jutarnja Yoga", tip: "YOGA", lokacija: "Maksimir, livada kod vidikovca", vrijeme: "Subota, 08:30", prijavljeno: 22, kapacitet: 30, opis: "Besplatan sat yoge na otvorenom." },
  { id: 7, aktivnost: "Stolni tenis", tip: "TABLE_TENNIS", lokacija: "Park mladenaca, Siget", vrijeme: "Danas, 14:00", prijavljeno: 1, kapacitet: 2, opis: "Tražim nekoga za par setova." },
  { id: 8, aktivnost: "Rolanje", tip: "SKATING", lokacija: "Jarun, staza za role", vrijeme: "Utorak, 19:00", prijavljeno: 5, kapacitet: 15, opis: "Zajednički krug oko Jaruna." },
  { id: 9, aktivnost: "Badminton", tip: "BADMINTON", lokacija: "Bundek, zapadna livada", vrijeme: "Srijeda, 17:00", prijavljeno: 2, kapacitet: 4, opis: "Tražimo još jedan par." },
  { id: 10, aktivnost: "Street Workout", tip: "WORKOUT", lokacija: "Velesajam, otvoreni gym", vrijeme: "Četvrtak, 18:00", prijavljeno: 4, kapacitet: 8, opis: "Zajednički trening snage." },
  { id: 11, aktivnost: "Nogomet 5 na 5", tip: "FOOTBALL", lokacija: "Prečko, umjetna trava", vrijeme: "Danas, 20:00", prijavljeno: 10, kapacitet: 10, opis: "Termin je popunjen." },
  { id: 12, aktivnost: "Bicikliranje na Sljeme", tip: "CYCLING", lokacija: "Gračani, parking žičara", vrijeme: "Nedjelja, 10:00", prijavljeno: 8, kapacitet: 20, opis: "Uspon cestom do vrha." },
  { id: 13, aktivnost: "Zumba na otvorenom", tip: "DANCE", lokacija: "Park Ribnjak", vrijeme: "Ponedjeljak, 19:00", prijavljeno: 12, kapacitet: 25, opis: "Trening uz glazbu." },
  { id: 14, aktivnost: "Pikado turnir", tip: "DARTS", lokacija: "Kvartovski kafić, Dubrava", vrijeme: "Subota, 20:00", prijavljeno: 8, kapacitet: 16, opis: "Amatersko druženje uz pikado." },
  { id: 15, aktivnost: "Plivanje", tip: "SWIMMING", lokacija: "Bazen Utrina", vrijeme: "Danas, 07:00", prijavljeno: 3, kapacitet: 10, opis: "Ranojutarnje plivanje." },
  { id: 16, aktivnost: "Kuglanje (Hobby)", tip: "BOWLING", lokacija: "Zaprešić, staza", vrijeme: "Utorak, 18:00", prijavljeno: 4, kapacitet: 6, opis: "Rekreativno kuglanje." },
  { id: 17, aktivnost: "Skate Session", tip: "SKATEBOARD", lokacija: "Mimara", vrijeme: "Srijeda, 16:00", prijavljeno: 5, kapacitet: 12, opis: "Vježbamo nove trikove." },
  { id: 18, aktivnost: "Tai Chi", tip: "TAI_CHI", lokacija: "Park dr. Franje Tuđmana", vrijeme: "Četvrtak, 07:30", prijavljeno: 10, kapacitet: 15, opis: "Lagane jutarnje vježbe." },
  { id: 19, aktivnost: "Planinarenje Bikčevićeva", tip: "HIKING", lokacija: "Bliznec", vrijeme: "Subota, 09:00", prijavljeno: 25, kapacitet: 50, opis: "Standardna ruta do Puntijarke." },
  { id: 20, aktivnost: "Tenis zid", tip: "TENNIS", lokacija: "Ravnice", vrijeme: "Danas, 15:00", prijavljeno: 1, kapacitet: 2, opis: "Vježbanje udaraca." },
  { id: 21, aktivnost: "Frizbi na livadi", tip: "FRISBEE", lokacija: "Bundek", vrijeme: "Nedjelja, 16:00", prijavljeno: 4, kapacitet: 10, opis: "Ultimate frisbee osnove." },
  { id: 22, aktivnost: "Borilačke vještine osnove", tip: "MARTIAL_ARTS", lokacija: "Velesajam", vrijeme: "Ponedjeljak, 20:00", prijavljeno: 6, kapacitet: 12, opis: "Ogledni trening." },
  { id: 23, aktivnost: "Rukometni trening", tip: "HANDBALL", lokacija: "Kutija Šibica", vrijeme: "Srijeda, 19:30", prijavljeno: 9, kapacitet: 14, opis: "Rekreativni rukomet." },
  { id: 24, aktivnost: "Boks na vreći", tip: "BOXING", lokacija: "Jarun", vrijeme: "Četvrtak, 18:00", prijavljeno: 2, kapacitet: 4, opis: "Tehnika udaraca." },
  { id: 25, aktivnost: "Pilates", tip: "PILATES", lokacija: "Boćarski dom", vrijeme: "Petak, 08:00", prijavljeno: 15, kapacitet: 20, opis: "Snaga i fleksibilnost." },
  { id: 26, aktivnost: "Penjanje na stijeni", tip: "CLIMBING", lokacija: "Velesajam", vrijeme: "Subota, 11:00", prijavljeno: 4, kapacitet: 6, opis: "Penjanje s osiguranjem." },
  { id: 27, aktivnost: "Biljar 8-ball", tip: "BILLIARDS", lokacija: "Metropolis Club", vrijeme: "Danas, 21:00", prijavljeno: 2, kapacitet: 4, opis: "Igramo parove." },
  { id: 28, aktivnost: "Veslanje", tip: "ROWING", lokacija: "Jarun", vrijeme: "Petak, 07:00", prijavljeno: 4, kapacitet: 8, opis: "Rekreativno veslanje." },
  { id: 29, aktivnost: "Gimnastika osnove", tip: "GYMNASTICS", lokacija: "Otvoreni gym Jarun", vrijeme: "Ponedjeljak, 17:00", prijavljeno: 5, kapacitet: 10, opis: "Osnovni elementi." },
  { id: 30, aktivnost: "Streličarstvo", tip: "ARCHERY", lokacija: "Črnomerec", vrijeme: "Nedjelja, 14:00", prijavljeno: 2, kapacitet: 4, opis: "Vlastita oprema." },
  { id: 31, aktivnost: "Slacklining", tip: "SLACKLINE", lokacija: "Zrinjevac", vrijeme: "Danas, 15:30", prijavljeno: 3, kapacitet: 8, opis: "Balans i ravnoteža." },
  { id: 32, aktivnost: "Fitnes za umirovljenike", tip: "FITNESS", lokacija: "Peščenica", vrijeme: "Utorak, 09:00", prijavljeno: 18, kapacitet: 25, opis: "Lagane vježbe." },
  { id: 33, aktivnost: "Sakupljanje smeća (Plogging)", tip: "COMMUNITY", lokacija: "Nasip", vrijeme: "Subota, 11:00", prijavljeno: 10, kapacitet: 100, opis: "Trčimo i skupljamo smeće." }
];