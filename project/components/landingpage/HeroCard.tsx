"use client";

import Link from "next/link";
import styles from "./HeroCard.module.css";
import { ArrowRight, Sparkles } from "lucide-react";

export default function HeroSection() {
    return (
      <section className={styles.hero}>
        <div className={styles.blobBlue} />
        <div className={styles.blobPurple} />
  
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.badge}>
              <Sparkles size={16} />
              <span>Jednostavno. Brzo. Učinkovito.</span>
            </div>
  
            <h1 className={styles.title}>
              Rezervacija ili trening{" "}
              <span className={styles.gradientText}>kad god želiš</span>
            </h1>
  
            <p className={styles.subtitle}>
              Pronađi termin u svojoj blizini
            </p>
  
            <p className={styles.description}>
              MatchTrack je web aplikacija koja omogućuje jednostavno pronalaženje
              sportskih aktivnosti, povezivanje s drugim korisnicima i
              sudjelovanje u terminima.
            </p>
  
            <Link href="/authentication/register" className={styles.cta}>
              Registracija
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    );
  }