# Project Review: MatchTrack



---

## 1. Progress so far (Dosadašnji napredak)
Projekt se razvija stabilno prema definiranim fazama. Ključna postignuća uključuju:
* **Arhitektura:** Postavljena informacijska arhitektura, sitemap i korisničke persone (Listopad 2025).
* **Tehnološki stog:** Implementiran **Next.js App Router** s modernom navigacijom.
* **Dinamički podaci:** Implementirane dinamičke rute, REST API integracija i funkcionalna paginacija za sportske termine (Prosinac 2025).
* **Korisnički sustav:** Završena funkcionalnost registracije korisnika (Siječanj 2026).
* **UI/UX:** Implementirana potpuna **responzivnost** na Home page-u i stranici s terminima, usklađena s modernim "clean white" dizajnom i brendingom.

## 2. Risk assessment (Procjena rizika)
Identificirani su sljedeći izazovi:
* **Headless CMS integracija:** Povezivanje blog sekcije s vanjskim CMS-om (npr. Strapi ili Contentful) zahtijeva pažljivo upravljanje API kvotama i renderiranje složenog sadržaja (video, kod).
* **Upravljanje stanjem:** Osiguravanje sinkronizacije privatnog sadržaja (profila) nakon prijave na svim uređajima.
* **Performanse:** Optimizacija slika i video materijala (MatchTrack_ Game On.mp4) kako bi aplikacija ostala brza na mobilnim mrežama.

## 3. Team contributions (Doprinosi članova)
### **Renato Carić **
* Inicijalna arhitektura projekta i dokumentacija.
* Implementacija dinamičkih ruta, REST API-ja i sustava paginacije.
* Finalizacija responzivnog dizajna i integracija `TopMenu` navigacije.
* Upravljanje Git repozitorijem i spajanje (Merge) grana.

### **Borna Bačkov **
* Postavljanje osnovnog Next.js okvira i navigacije.
* Razvoj i dizajn Home page-a.
* Implementacija sustava za registraciju korisnika.
* Rad na vizualnim komponentama i layoutu.

## 4. Remaining work (Preostali rad)
* **Headless CMS:** Implementacija javne blog stranice s bogatim sadržajem (slike, video, kod).
* **Search/Filter:** Razvoj sustava za pretragu i filtriranje sportskih termina/terena.
* **Privatni sadržaj:** Dovršetak stranice "Moj Profil" dostupne samo prijavljenim korisnicima.
* **Finalno testiranje:** Provjera rada na različitim preglednicima i veličinama ekrana (QA).

## 5. Completion date (Planirani datum završetka)
Tentativni plan za finalizaciju projekta je **veljača 2026.**, čime će se zadovoljiti svi Web Application Requirements.

---

### Status Requirements provjera:
| Requirement | Status |
| :--- | :--- |
| Web browser accessibility | ✅ Završeno |
| Responsive design (different sizes) | ✅ Završeno |
| Search/filter services | 🏃 U tijeku |
| User login / private content | 🏃 U tijeku |
| Blog with diverse content | 📅 Planirano |
| Remote Headless CMS | 📅 Planirano |
