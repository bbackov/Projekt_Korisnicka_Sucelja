"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/app/authentication/auth/AuthContext";
import CreateEventModal from "@/app/(app)/termini/CreateEventModal";
import styles from "./WelcomeCard.module.css";

type Props = {
  cmsTitle?: string;
  cmsSubtitle?: string;
  cmsBadge?: string;
  cmsCtaText?: string;
  cmsCtaHref?: string;
};

export default function WelcomeCard({
  cmsTitle,
  cmsSubtitle,
  cmsBadge,
  cmsCtaText,
  cmsCtaHref,
}: Props) {
  const [createOpen, setCreateOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  const title = cmsTitle ?? "Dobro došao!";
  const subtitle =
    cmsSubtitle ??
    "Pronađi sportske aktivnosti u svojoj blizini i pridruži se zajednici istomišljenika.";

  const primaryCtaText = cmsCtaText ?? "Pogledaj termine";
  const primaryCtaHref = cmsCtaHref ?? "/termini";

  const handleCreateClick = () => {
    if (!isAuthenticated) {
      window.location.href = "/authentication/login";
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
            {cmsBadge && (
              <p className={styles.greeting}>{cmsBadge}</p>
            )}

            <h1 className={styles.title}>{title}</h1>

            <p className={styles.subtitle}>{subtitle}</p>

            <div className={styles.actions}>
              <Link href={primaryCtaHref} className={styles.primary}>
                {primaryCtaText}
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
              <p className={styles.visualHint}>
                Jedna nova ekipa svaki tjedan
              </p>
            </div>

            <div className={styles.visualTags}>
              <span className={styles.tag}>Nogomet</span>
              <span className={styles.tag}>Odbojka</span>
              <span className={styles.tag}>Trčanje</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}