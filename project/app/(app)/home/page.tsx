"use client";

import WelcomeCard from "@/components/home/WelcomeCard";
import QuickStats from "@/components/home/QuickStats";
import QuickActionCard from "@/components/home/QuickActionCards";
import Link from "next/link";
import styles from "./home.module.css";

export default function HomePage() {
  return (
    <main>
      <WelcomeCard />
      <QuickStats />

      <section className={styles.section}>
        <div className={styles.recommendedBlock}>
          <h2 className={styles.sectionTitle}>Preporuceno za tebe</h2>
          <QuickActionCard variant="home" />
        </div>

        <div className={styles.nextStepsCard}>
          <h3 className={styles.nextStepsTitle}>Sljedeci koraci</h3>
          <p className={styles.nextStepsIntro}>
            Popuni tjedan aktivnostima i pronadi ekipu za trening.
          </p>

          <div className={styles.nextStepsActions}>
            <Link href="/termini" className={styles.primaryAction}>
              Pregledaj sve termine
            </Link>
            <Link href="/venues" className={styles.secondaryAction}>
              Pronadi lokacije blizu sebe
            </Link>
          </div>

          <div className={styles.tipBox}>
            <p className={styles.tipLabel}>Brzi savjet</p>
            <p className={styles.tipText}>
              Aktivnosti s manjim brojem prijavljenih se najbrze popune tijekom veceri.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
