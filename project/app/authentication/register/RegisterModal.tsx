"use client";

import { useRouter } from "next/navigation";
import RegisterForm from "./RegisterForm";
import styles from "./RegisterModal.module.css"

export default function RegisterModal() {
  const router = useRouter();

  const closeModal = () => {
    router.back(); 
  };

  const handleSuccess = () => {
    router.push("/authentication/login");
  };

  return (
    <div className={styles.overlay} onClick={closeModal}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.close} onClick={closeModal}>
          ✕
        </button>

        <h2 className={styles.title}>Registracija</h2>

        <RegisterForm onSuccess={handleSuccess} />
      </div>
    </div>
  );
}