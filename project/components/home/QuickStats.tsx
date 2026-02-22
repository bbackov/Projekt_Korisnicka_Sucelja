"use client";

import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import styles from "./QuickStats.module.css";
import { SPORT_META } from "@/components/common/ui/sportMeta";
import { SPORT_LABEL, type SportTip } from "@/components/common/ui/sportTypes";

type StatsResponse = {
  success: boolean;
  totalEvents: number;
  mySignups: number;
  mostPopular: SportTip | null;
};

export default function QuickStats() {
  const [stats, setStats] = useState<StatsResponse | null>(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await fetch("/api/events/stats");
        const data = await res.json();
        if (data?.success) {
          setStats(data);
        }
      } catch (err) {
        console.error("Stats error:", err);
      }
    };

    loadStats();
  }, []);

  const popularMeta =
    stats?.mostPopular && SPORT_META[stats.mostPopular]
      ? SPORT_META[stats.mostPopular]
      : null;

  return (
    <section className={styles.wrapper}>
      {/* Ukupno termina */}
      <div className={styles.card}>
        <div className={styles.iconStatic}>
          <Icon icon="mdi:calendar-multiple" width={22} />
        </div>
        <div className={styles.text}>
          <h3 className={styles.value}>
            {stats ? stats.totalEvents : "..."}
          </h3>
          <p className={styles.label}>Ukupno termina</p>
          <span className={styles.sub}>Svi događaji</span>
        </div>
      </div>

      {/* Moje prijave */}
      <div className={styles.card}>
        <div className={styles.iconStatic}>
          <Icon icon="mdi:account-check" width={22} />
        </div>
        <div className={styles.text}>
          <h3 className={styles.value}>
            {stats ? stats.mySignups : "..."}
          </h3>
          <p className={styles.label}>Moje prijave</p>
          <span className={styles.sub}>
            Na koliko si se prijavio
          </span>
        </div>
      </div>

      {/* Najpopularniji sport */}
      <div className={styles.card}>
        <div
          className={styles.iconGradient}
          style={{
            background: popularMeta?.gradient ?? "linear-gradient(135deg,#64748b,#475569)",
          }}
        >
          {popularMeta && (
            <Icon icon={popularMeta.icon} width={22} color="white" />
          )}
        </div>

        <div className={styles.text}>
          <h3 className={styles.value}>
            {stats?.mostPopular
              ? SPORT_LABEL[stats.mostPopular]
              : "..."}
          </h3>
          <p className={styles.label}>Najpopularnije</p>
          <span className={styles.sub}>Sport u zajednici</span>
        </div>
      </div>
    </section>
  );
}