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

      <section className={styles.grid}>
        <div className={styles.recommended}>
          <h2 className={styles.title}>Preporuceno za tebe</h2>
          <QuickActionCard variant="home" />
        </div>

        <aside className={styles.sidePanel}>
          <h3 className={styles.sideTitle}>Sljedeci koraci</h3>
          <p className={styles.sideIntro}>Popuni tjedan aktivnostima i pronadi ekipu za trening.</p>

          <div className={styles.sideActions}>
            <Link href="/termini" className={styles.sideAction}>
              Pregledaj sve termine
            </Link>
            <Link href="/venues" className={styles.sideActionAlt}>
              Pronadi lokacije blizu sebe
            </Link>
          </div>

          <div className={styles.tipCard}>
            <p className={styles.tipLabel}>Brzi savjet</p>
            <p className={styles.tipText}>
              Aktivnosti s manjim brojem prijavljenih se najbrze popune tijekom veceri.
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}
