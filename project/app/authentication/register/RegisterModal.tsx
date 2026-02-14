"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import RegisterForm from "./RegisterForm";
import styles from "./RegisterModal.module.css";
import Link from "next/link";

export default function RegisterModal() {
  const router = useRouter();
  const [registered, setRegistered] = useState(false);

  const closeModal = () => {
    router.back();
  };

  const handleSuccess = () => {
    setRegistered(true);
  };

  return (
    <div className={styles.overlay} onClick={closeModal}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close} onClick={closeModal}>
          ✕
        </button>

        {registered ? (
          <div style={{ textAlign: "center", padding: "2rem 1rem" }}>
            <h2 className={styles.title}>Registracija uspjesna!</h2>
            <p style={{ color: "var(--color-muted)", marginTop: "1rem", lineHeight: 1.6 }}>
              Potvrdite svoj email klikom na link koji smo vam poslali. Nakon toga se mozete prijaviti.
            </p>
            <Link
              href="/authentication/login"
              style={{
                display: "inline-block",
                marginTop: "1.5rem",
                padding: "0.75rem 2rem",
                background: "var(--color-primary)",
                color: "#fff",
                borderRadius: "var(--radius-sm)",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              Idi na prijavu
            </Link>
          </div>
        ) : (
          <>
            <h2 className={styles.title}>Registracija</h2>
            <RegisterForm onSuccess={handleSuccess} />
          </>
        )}
      </div>
    </div>
  );
}
