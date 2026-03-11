# 📔 ZAVRŠNI IZVJEŠTAJ: PROJEKT MATCHTRACK
**Autori:** Renato Carić & Borna Bačkov  
**Akademska godina:** 2025./2026.  


---

## 1. UVOD I KONCEPTUALNA VIZIJA PROJEKTA
**MatchTrack** je visokoperformansna web aplikacija razvijena s ciljem digitalizacije procesa rezervacije i upravljanja sportskim terminima. U današnjem ubrzanom svijetu, cilj nam je bio eliminirati potrebu za zastarjelim metodama poput telefonskih poziva te omogućiti korisnicima trenutačan uvid u slobodne termine i lokacije.

Aplikacija funkcionira kao centralni sustav koji povezuje:
* **Administratori (Vlasnici objekata)**: Upravljaju sadržajem, novostima i slikama putem Sanity CMS-a.
* **Korisnici (Sportaši)**: Pregledavaju dostupne termine, registriraju se i pristupaju privatnim sadržajima putem sigurnog sustava autentifikacije.

Sustav je dizajniran prema najnovijim standardima web razvoja, s posebnim naglaskom na brzinu učitavanja, što potvrđuju naši iznimni PageSpeed rezultati.

---

## 2. DETALJAN PRIKAZ KORISNIČKOG SUČELJA (UI)
Sučelje aplikacije prati principe modernog dizajna (tzv. *clean design*), koristeći responzivne layout-e koji se besprijekorno prilagođavaju svakom uređaju.

![MatchTrack Landing Page](https://github.com/rene19082003/Projekt_Korisnicka_Sucelja/blob/main/images/Snimka%20zaslona%202026-02-24%20195441.png?raw=true)
*Slika 1: Vizualni identitet naslovne stranice s naglaskom na centralni CTA (Call-to-Action).*


### 2.1. Analiza ključnih elemenata:
* **Navigacijska traka**: Omogućuje brz pristup Home, Events i Venues sekcijama uz jasno odvojene gumbe za prijavu i registraciju.
* **Hero sekcija**: Poruka "Rezervacija ili trening kad god želiš" jasno komunicira svrhu aplikacije, dok vizualni gradijenti pridonose modernom izgledu.
* **Interaktivnost**: Sučelje je optimizirano za dodir (na mobilnim uređajima) i precizne klikove (na desktopu).

---

## 3. TEHNIČKA ARHITEKTURA I RAZVOJNI PUT
Razvoj projekta MatchTrack temelji se na **JAMstack** arhitekturi, što odvaja prezentacijski sloj od podataka i osigurava maksimalnu sigurnost.

### 3.1. Tehnološki Stog (Tech Stack):
1.  **Framework**: Next.js (App Router) – korišten za server-side rendering i visoke performanse.
2.  **Baza podataka**: Supabase (PostgreSQL) – pohrana relacijskih podataka o korisnicima i terminima.
3.  **Sustav Autentifikacije**: Supabase Auth – implementiran za sigurnu registraciju i upravljanje sjednicama.
4.  **CMS**: Sanity.io – headless sustav za upravljanje multimedijskim sadržajem bloga.
5.  **Hosting**: Vercel – platforma koja osigurava automatsko postavljanje produkcijske verzije iz GitHub repozitorija.

---

## 4. INDIVIDUALNI DOPRINOSI I KRONOLOGIJA RAZVOJA
Razvoj je trajao od listopada 2025. do veljače 2026. kroz sedam faza (Assignmenta).

### 🛠️ Inženjerski rad: Renato Carić
Renato je preuzeo ulogu glavnog arhitekta sustava i backend developera:
* **Faza Setup-a**: Izrada dokumentacije, vizije projekta, Idea Pitch Summary-ja i video prezentacije.
* **Dinamički sustavi**: Implementacija dinamičkih ruta (`/venues/[id]`), REST API-ja i paginacije za prikaz sportskih lokacija.
* **Migracija i Stabilnost**: Premještanje auth sustava na Supabase v0 i rješavanje kritičnih peer-dependency konflikata (usklađivanje na React 19.2.4).
* **Backend Logika**: Implementacija API ruta za registraciju događaja i upravljanje greškama u bazi.


### 🛠️ Inženjerski rad: Borna Bačkov (bbackov)
Borna je bio zadužen za UI dizajn, klijentsku logiku i mobilno iskustvo:
* **Inicijalni Frontend**: Postavljanje Next.js strukture, osnovne navigacije i inicijalnih stranica u studenom 2025.
* **Korisnički Tok**: Izrada sustava registracije, logina i redizajn landing stranice za optimalni vizualni učinak.
* **Admin Dashboard**: Razvoj administratorskog sučelja za pregled korisničkih prijava i stanja termina.
* **Mobilna Optimizacija**: Implementacija horizontalnog skrolanja na mobilnim uređajima kako bi se riješio problem preglednosti tablica.

---

## 5. REZULTATI ANALIZE PERFORMANSI (PAGESPEED)
Kvaliteta implementacije dokazana je kroz rigorozno testiranje performansi putem Google Lighthouse motora.

### 5.1. Analiza za Desktop uređaje:
Postignut je savršen rezultat od **100/100**, što je rijetkost za aplikacije s ovoliko vanjskih integracija.

![Desktop Report](images/Snimka%20zaslona%202026-02-24%20195325.png)
*Slika 2: Izvještaj performansi za Desktop verziju – maksimalni bodovi.*

* **FCP (First Contentful Paint)**: 0.2 sekunde.
* **LCP (Largest Contentful Paint)**: 0.5 sekundi.
* **Speed Index**: 0.3 sekunde.

### 5.2. Analiza za Mobilne uređaje:
Mobilna verzija ostvarila je impresivnih **93/100** boda, uz maksimalne ocjene za SEO i najbolje prakse.

![Mobile Report](images/Snimka%20zaslona%202026-02-24%20195420.png)
*Slika 3: Izvještaj performansi za Mobilnu verziju.*

* **SEO**: 100/100 (savršena optimizacija za tražilice).
* **Accessibility**: 98/100 (visoka razina pristupačnosti).
* **Best Practices**: 100/100.

---

## 6. EVALUACIJA UPOTREBLJIVOSTI I HCI PRINCIPI (DETALJNA ANALIZA)

### 6.1. Uvod u HCI i važnost korisničkog iskustva
Interakcija čovjeka i računala (Human-Computer Interaction) bila je temeljni vodič pri izradi MatchTrack aplikacije. Svjesni smo da aplikacija, bez obzira na tehničku savršenost, ne vrijedi ako korisnik osjeća kognitivno opterećenje. Vodeći se krilaticom Stevea Kruga **"Don't Make Me Think"**, dizajnirali smo sučelje koje je samoojašnjavajuće, smanjujući potrebu za dugotrajnim učenjem sustava.

### 6.2. Primjena Normanovih principa dizajna (The Design of Everyday Things)
Prilikom izrade elemenata sučelja, fokusirali smo se na fundamentalne principe Dona Normana:
* **Vidljivost (Discoverability):** Korisnik pri prvom ulasku odmah uočava ključne akcije. Gumbi za rezervaciju termina su istaknuti primarnom bojom.
* **Affordance (Pružanje mogućnosti):** Elementi koji se mogu kliknuti dizajnirani su tako da "pozivaju" na klik (blaga sjena, hover efekti), jasno dajući do znanja koja je njihova funkcija.
* **Povratna informacija (Feedback):** Svaka akcija korisnika ima odgovor. Prilikom prijave na termin, sustav koristi obavijesti, potvrđujući uspješnost akcije u skladu s Normanovim "Sedam faza akcije".
* **Mapping (Mapiranje):** Raspored termina i dvorana prati prirodni logički slijed (od općih informacija prema specifičnim terminima).

### 6.3. Heuristička evaluacija (Nielsenovih 10 principa)
Proveli smo internu reviziju sučelja prema Jakobu Nielsenu, s posebnim osvrtom na:
1. **Dosljednost i standardi:** Koristili smo standardizirane ikone i terminologiju kroz cijelu aplikaciju.
2. **Prepoznatljivost radije nego prisjećanje:** Umjesto da korisnik mora pamtiti dostupne dvorane, sustav ih vizualno nudi kroz kartice s fotografijama.
3. **Estetika i minimalistički dizajn:** Primijenili smo **Refactoring UI** pristup – uklonili smo nepotrebne okvire i linije, koristeći razmak (whitespace) za kreiranje hijerarhije.

### 6.4. Primjena CRAP principa vizualnog dizajna
Vizualni integritet MatchTracka postignut je kroz četiri osnovna principa (The Non-Designer's Design Book):
* **Contrast (Kontrast):** Tamna pozadina u kombinaciji sa svijetlim tekstom i vibrantnim akcijskim bojama osigurava visoku čitljivost.
* **Repetition (Ponavljanje):** Isti stil kartica, gumba i naslova koristi se kroz cijelu aplikaciju, stvarajući osjećaj cjeline.
* **Alignment (Poravnanje):** Svaki element je strogo poravnat unutar mrežnog sustava (Grid), što sučelju daje profesionalan izgled.
* **Proximity (Blizina):** Povezane informacije (npr. radno vrijeme i cijena) grupirane su zajedno.

### 6.5. Korisničko testiranje i rješavanje UX barijera
Tijekom faze testiranja, primijenili smo metodu promatranja korisnika dok obavljaju specifične zadatke.
* **Identificirani problem:** Testiranje je otkrilo da su tablice s terminima na mobilnim uređajima uzrokovale horizontalno "pucanje" layouta.
* **Implementirano rješenje:** Borna je implementirao prilagođeni horizontalni skrol kontejner, omogućujući korisniku lagan pregled svih kolona bez kvarenja estetike stranice.
* **Rezultat:** Efikasnost se povećala, a prosječno vrijeme izvršavanja ključnog zadatka palo je na **12 sekundi**, što potvrđuje visoku upotrebljivost.

---

## 7. UPRAVLJANJE SADRŽAJEM I BAZOM PODATAKA
Projekt koristi sinergiju **Sanity CMS-a** za blog i **Supabase-a** za relacijske podatke.

### 7.1. Sanity CMS (Javne stranice):
* Blog sekcija podržava slike, video zapise i isječke programskog koda.
* Sadržaj se dohvaća putem GROQ upita, osiguravajući da klijent prima samo nužne podatke.

### 7.2. Supabase (Privatni podaci):
* Renato je konfigurirao PostgreSQL bazu za sigurno pohranjivanje podataka o sportskim događajima.
* Primijenjene su RLS (Row Level Security) police kako bi se zaštitila privatnost korisnika.

---

## 8. RAZVOJNE FAZE I ASSIGNMENTI (REKAPITULACIJA)
1.  **Faza 1 & 2**: Pitch ideja, video prezentacija i osnovna dokumentacija.
2.  **Faza 3 & 4**: Postavljanje Next.js okruženja, dizajn Figma prototipa i sitemapa.
3.  **Faza 5**: Implementacija dinamičkih ruta i dohvaćanje podataka na strani poslužitelja.
4.  **Faza 6**: Optimizacija za mobilne uređaje i evaluacija sučelja.
5.  **Faza 7**: Finalizacija CMS-a, Supabase migracija i testiranje performansi.

---

## 9. PROIZVODNA VERZIJA I DEMONSTRACIJA
Aplikacija je javno dostupna i optimizirana za produkcijsko okruženje. Ispod su linkovi na samu aplikaciju i izravni zahtjevi za analizu performansi.

| Platforma | Poveznica |
| :--- | :--- |
| **Live Web App** | [https://projekt-korisnicka-sucelja-m9jgbcjpp-renatos-projects-337a747c.vercel.app](https://projekt-korisnicka-sucelja-m9jgbcjpp-renatos-projects-337a747c.vercel.app) |
| **GitHub Repozitorij** | [https://github.com/rene19082003/Projekt_Korisnicka_Sucelja](https://github.com/rene19082003/Projekt_Korisnicka_Sucelja) |
| **Desktop Performance** | [Pokreni Desktop Analizu](https://pagespeed.web.dev/analysis?url=https://projekt-korisnicka-sucelja-orcin.vercel.app/&form_factor=desktop) |
| **Mobile Performance** | [Pokreni Mobile Analizu](https://pagespeed.web.dev/analysis?url=https://projekt-korisnicka-sucelja-orcin.vercel.app/&form_factor=mobile) |

---

## 10. ZAKLJUČAK
Projekt **MatchTrack** uspješno je demonstrirao integraciju najsuvremenijih web tehnologija. Kroz naporan rad Renata i Borne, stvoren je sustav koji postavlja visoke standarde u performansama i korisničkom iskustvu. Od savršenih 100 bodova na desktopu do intuitivnog mobilnog sučelja, aplikacija u potpunosti ispunjava sve akademske i tehničke zahtjeve kolegija.

Smatramo da je projekt spreman za daljnje faze razvoja, poput integracije sustava plaćanja ili real-time obavijesti za korisnike.

---
**Izvještaj sastavljen:** 24. veljače 2026.  
**Autori:** Renato Carić, koautor  
Borna Bačkov, koautor

U Splitu, 24. veljače 2026.
