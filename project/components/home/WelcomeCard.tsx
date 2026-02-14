"use client";

import Link from "next/link";
import styles from "./WelcomeCard.module.css";

export default function WelcomeCard() {
  return (
    <section className={styles.banner}>
      <div className={styles.content}>
        <div className={styles.text}>
          <p className={styles.greeting}>Dobrodošao 👋</p>

          <h1 className={styles.title}>
            Pronađi svoj sljedeći <span>sportski izazov</span>
          </h1>

          <p className={styles.subtitle}>
            Pronađi sportske aktivnosti u svojoj blizini i
            pridruži se zajednici istomišljenika.
          </p>

          <div className={styles.actions}>
            <Link href="/termini" className={styles.primary}>
              Pogledaj termine
            </Link>

            <Link href="/termini/novo" className={styles.secondary}>
              Kreiraj događaj
            </Link>
          </div>
        </div>
        <div className={styles.visual} />
      </div>
    </section>
  );
}