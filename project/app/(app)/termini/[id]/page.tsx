import { SPORT_META } from "@/components/common/ui/sportMeta";
import { SPORT_DOGADJAJI } from "../data";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@iconify/react";
import { MapPin,Users,Clock,User2,FileText} from "lucide-react";
import { formatVrijeme } from "@/util/toDate";
import { JoinButton } from "./JoinButton";
import styles from "./detalji.module.css"

export default async function DetaljiPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = SPORT_DOGADJAJI.find(t => t.id === Number(id));
  if (!item) notFound();
  const meta = SPORT_META[item.tip] ?? SPORT_META.OTHER;
  const full=item.prijavljeno >= item.kapacitet;

  



  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <Link href="/termini" className={styles.close}>✕</Link>

          <div className={styles.iconWrapper} style={{ background: meta.gradient }}>
            <Icon icon={meta.icon} width={28} />
          </div>

          <h1 className={styles.title}>{item.aktivnost}</h1>
        </div>

        <div className={styles.infoCard}>
          <FileText />
            <div>
              <h3>Opis</h3>
              <p>{item.opis}</p>
            </div>
        </div>

        <div className={styles.infoCard}>
          <MapPin />
          <div>
            <h3>Lokacija</h3>
            <p>{item.lokacija}</p>
          </div>
        </div>

        <div className={styles.infoCard}>
          <Clock />
          <div>
            <h3>Vrijeme događaja</h3>
            <p>{formatVrijeme(item.vrijeme)}</p>
          </div>
        </div>

        <div className={styles.infoCard}>
          <Users />
          <div>
            <h3>Trenutno prijavljenih</h3>
            <p>
              {full ? "Popunjeno" : `${item.prijavljeno} od maksimalno ${item.kapacitet}`}
            </p>
          </div>
        </div>

        <div className={styles.infoCard}>
          <User2 />
          <div>
            <h3>Kreator</h3>
            <p>ime</p>
          </div>
        </div>

        <div className={styles.action}>
          <JoinButton full={full} />
        </div>
        </div>
      </div>
  );
}