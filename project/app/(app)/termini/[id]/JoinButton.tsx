"use client";

import { useAuth } from "@/app/authentication/auth/AuthContext";
import Link from "next/link";
import styles from "./JoinButton.module.css";

export function JoinButton({ full }: { full: boolean }) {
  const { isAuthenticated } = useAuth();

  if (full) {
    return (
      <div className={styles.wrapper}>
        <button className={styles.full} disabled>
          Popunjeno
        </button>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className={styles.wrapper}>
        <Link href="/authentication/login" className={styles.link}>
          <button className={styles.primary}>
            Prijavi se
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <button className={styles.primary}>
        Pridruži se
      </button>
    </div>
  );
}