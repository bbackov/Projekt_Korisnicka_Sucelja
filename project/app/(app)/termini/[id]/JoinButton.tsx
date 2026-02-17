"use client";

import { useAuth } from "@/app/authentication/auth/AuthContext";
import { registerForEvent, unregisterFromEvent, getMyRegistrations } from "@/app/services/events";
import { showToast } from "@/app/services/toast";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./JoinButton.module.css";

export function JoinButton({ full, eventId }: { full: boolean; eventId: number }) {
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [checkingRegistration, setCheckingRegistration] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      setCheckingRegistration(false);
      setIsRegistered(false);
      return;
    }

    const checkRegistration = async () => {
      try {
        const res = await getMyRegistrations();
        if (res?.success && Array.isArray(res.registered)) {
          setIsRegistered(res.registered.includes(eventId));
        }
      } catch (err) {
        console.error("Error checking registration:", err);
      } finally {
        setCheckingRegistration(false);
      }
    };

    checkRegistration();
  }, [eventId, isAuthenticated]);

  const handleRegister = async () => {
    setLoading(true);
    const res = await registerForEvent(eventId);
    setLoading(false);

    if (res?.success) {
      setIsRegistered(true);
      showToast({ message: "Uspjesno ste se prijavili", type: "success" });
      return;
    }

    const errorMessage = String(res?.error ?? "").toLowerCase();
    if (errorMessage.includes("already registered")) {
      setIsRegistered(true);
      showToast({ message: "Vec ste prijavljeni na ovaj dogadaj", type: "info" });
      return;
    }

    showToast({ message: res?.error ?? "Neuspjela prijava", type: "error" });
  };

  const handleUnregister = async () => {
    setLoading(true);
    const res = await unregisterFromEvent(eventId);
    setLoading(false);

    if (res?.success) {
      setIsRegistered(false);
      showToast({ message: "Odjavljeni ste s aktivnosti", type: "success" });
    } else {
      showToast({ message: res?.error ?? "Greska pri odjavi", type: "error" });
    }
  };

  if (isAuthenticated && checkingRegistration) {
    return (
      <div className={styles.wrapper}>
        <button className={styles.primary} disabled>
          Ucitavanje...
        </button>
      </div>
    );
  }

  if (isRegistered) {
    return (
      <div className={styles.wrapper}>
        <button className={styles.unregister} disabled={loading} onClick={handleUnregister}>
          {loading ? "Odjava..." : "Odjavi se"}
        </button>
      </div>
    );
  }

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
          <button className={styles.primary}>Pridruzi se</button>
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <button className={styles.primary} disabled={loading} onClick={handleRegister}>
        {loading ? "Pridruzivanje..." : "Pridruzi se"}
      </button>
    </div>
  );
}
