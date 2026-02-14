"use client";

import { useState } from "react";
import { registerValidation } from "@/util/registerValidation";
import { RegisterUser } from "@/app/services/auth";
import styles from "./RegisterForm.module.css";

type Props = {
  onSuccess: () => void;
};

export default function RegisterForm({ onSuccess }: Props) {
  const [registerInfo, setRegisterInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setRegisterInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const resultValidation = registerValidation(registerInfo);

    if (!resultValidation.valid) {
      setMessage(resultValidation.error);
      setLoading(false);
      return;
    }

    const result = await RegisterUser(registerInfo);
    setLoading(false);

    if (!result.success) {
      setMessage(result.error);
      return;
    }

    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} noValidate className={styles.form}>
      <input
        name="firstName"
        type="text"
        placeholder="Ime"
        onChange={handleChange}
        className={styles.input}
      />
      <input
        name="lastName"
        type="text"
        placeholder="Prezime"
        onChange={handleChange}
        className={styles.input}
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        onChange={handleChange}
        className={styles.input}
      />
      <input
        name="password"
        type="password"
        placeholder="Lozinka"
        onChange={handleChange}
        className={styles.input}
      />
      <input
        name="confirmPassword"
        type="password"
        placeholder="Ponovi lozinku"
        onChange={handleChange}
        className={styles.input}
      />

      {message && <p className={styles.error}>{message}</p>}

      <button type="submit" disabled={loading} className={styles.button}>
        {loading ? "Registracija..." : "Registriraj se"}
      </button>
    </form>
  );
}
