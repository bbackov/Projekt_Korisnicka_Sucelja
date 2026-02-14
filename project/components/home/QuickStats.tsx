"use client";

import styles from "./QuickStats.module.css";
import { Calendar, Activity, Volleyball } from "lucide-react";

export default function QuickStats() {
  const stats = [
    {
      icon: Calendar,
      value: "24",
      label: "Ukupno termina",
      sub: "+3 ovaj tjedan",
    },
    {
      icon: Activity,
      value: "12",
      label: "Aktivnosti",
      sub: "5 ovaj mjesec",
    },
    {
      icon: Volleyball,
      value: "Odbojka",
      label: "Najpopularnije",
      sub: "Trening",
    },
  ];

  return (
    <section className={styles.wrapper}>
      {stats.map((stat, i) => (
        <div key={i} className={styles.card}>
          <div className={styles.icon}>
            <stat.icon size={20} />
          </div>

          <div className={styles.text}>
            <h3 className={styles.value}>{stat.value}</h3>
            <p className={styles.label}>{stat.label}</p>
            <span className={styles.sub}>{stat.sub}</span>
          </div>
        </div>
      ))}
    </section>
  );
}