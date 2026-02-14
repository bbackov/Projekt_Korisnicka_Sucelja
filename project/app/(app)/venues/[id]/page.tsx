import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MapPin, Users, Clock, ArrowRight, FileText, Dumbbell } from "lucide-react";
import { VENUES } from "../data";
import { SPORT_DOGADJAJI } from "../../termini/data";
import { formatVrijeme } from "@/util/toDate";
import styles from "./venueDetail.module.css";

export default async function VenueDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const venue = VENUES.find((v) => v.id === Number(id));
  if (!venue) notFound();

  const relatedEvents = SPORT_DOGADJAJI.filter((e) =>
    e.lokacija.toLowerCase().includes(venue.naziv.toLowerCase())
  );

  return (
    <main className={styles.page}>
      <Link href="/venues" className={styles.back}>
        <ArrowLeft size={16} />
        Natrag na lokacije
      </Link>

      <div className={styles.hero}>
        <Image
          src={venue.slika}
          alt={venue.naziv}
          width={900}
          height={340}
          className={styles.heroImage}
        />
        <span className={styles.heroBadge}>
          {venue.aktivnosti}{" "}
          {venue.aktivnosti === 1 ? "aktivnost" : "aktivnosti"}
        </span>
      </div>

      <div className={styles.content}>
        <h1 className={styles.title}>{venue.naziv}</h1>

        <div className={styles.infoGrid}>
          <div className={styles.infoCard}>
            <MapPin />
            <div>
              <h3>Adresa</h3>
              <p>{venue.adresa}</p>
            </div>
          </div>
          <div className={styles.infoCard}>
            <Dumbbell />
            <div>
              <h3>Broj sportova</h3>
              <p>{venue.sportovi.length}</p>
            </div>
          </div>
        </div>

        <div className={styles.descriptionCard}>
          <h3>O lokaciji</h3>
          <p>{venue.opis}</p>
        </div>

        <div className={styles.sportSection}>
          <h3>Dostupni sportovi</h3>
          <div className={styles.sportTags}>
            {venue.sportovi.map((sport) => (
              <span key={sport} className={styles.sportTag}>
                {sport}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.eventsSection}>
          <h3>Aktivni termini na ovoj lokaciji</h3>
          {relatedEvents.length === 0 ? (
            <div className={styles.noEvents}>
              Trenutno nema aktivnih termina na ovoj lokaciji.
            </div>
          ) : (
            relatedEvents.map((event) => {
              const full = event.prijavljeno >= event.kapacitet;
              return (
                <div key={event.id} className={styles.eventCard}>
                  <div className={styles.eventInfo}>
                    <h4>{event.aktivnost}</h4>
                    <div className={styles.eventMeta}>
                      <span className={styles.eventMetaItem}>
                        <Clock />
                        {formatVrijeme(event.vrijeme)}
                      </span>
                      <span className={styles.eventMetaItem}>
                        <Users />
                        {event.prijavljeno}/{event.kapacitet}
                        {full ? " (Popunjeno)" : ""}
                      </span>
                    </div>
                  </div>
                  <Link
                    href={`/termini/${event.id}`}
                    className={styles.eventLink}
                  >
                    Detalji
                    <ArrowRight size={14} />
                  </Link>
                </div>
              );
            })
          )}
        </div>
      </div>
    </main>
  );
}
