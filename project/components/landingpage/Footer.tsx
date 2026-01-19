"use client";

import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <span className={styles.brand}>MatchTrack</span>
        <span className={styles.copy}>
          © {new Date().getFullYear()} · Projekt iz kolegija Korisnička sučelja
        </span>
      </div>
    </footer>
  );
}
