"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/app/authentication/auth/AuthContext";
import CreateEventModal from "@/app/(app)/termini/CreateEventModal";
import styles from "./WelcomeCard.module.css";

export default function WelcomeCard() {
  const [createOpen, setCreateOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  const handleCreateClick = () => {
    if (!isAuthenticated) {
      window.location.href = '/authentication/login';
      return;
    }
    setCreateOpen(true);
  };

  return (
    <>
      {createOpen && (
        <CreateEventModal
          onClose={() => setCreateOpen(false)}
          onCreated={() => setCreateOpen(false)}
        />
      )}
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

              <button onClick={handleCreateClick} className={styles.secondary}>
                Kreiraj događaj
              </button>
            </div>
          </div>
          <div className={styles.visual}>
            <div className={styles.visualCard}>
              <p className={styles.visualLabel}>Tjedni cilj</p>
              <p className={styles.visualValue}>3 aktivnosti</p>
              <p className={styles.visualHint}>Jedna nova ekipa svaki tjedan</p>
            </div>

            <div className={styles.visualTags}>
              <span className={styles.tag}>Nogomet</span>
              <span className={styles.tag}>Odbojka</span>
              <span className={styles.tag}>Trcanje</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
