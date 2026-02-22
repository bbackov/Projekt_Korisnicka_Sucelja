"use client";

import { useState } from "react";
import styles from "./AdminPanel.module.css";

type AdminUser = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  can_create_venue: boolean;
};

export default function AdminPanel() {
  const [email, setEmail] = useState("");
  const [user, setUser] = useState<AdminUser | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!email.trim()) return;

    setLoading(true);
    setError("");
    setUser(null);

    try {
      const res = await fetch(
        `/api/admin/user?email=${encodeURIComponent(email)}`
      );
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Greška");
      } else {
        setUser(data.user);
      }
    } catch (err) {
      setError("Greška pri dohvaćanju korisnika");
    }

    setLoading(false);
  };

  const handleTogglePermission = async () => {
    if (!user) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/venues-permission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          allowed: !user.can_create_venue,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Greška");
      } else {
        setUser(data.user);
      }
    } catch (err) {
      setError("Greška pri ažuriranju");
    }

    setLoading(false);
  };

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <h2 className={styles.title}>Admin panel</h2>
  
        <div className={styles.searchSection}>
          <label htmlFor="trazi">Odaberi korisnika</label>
          <div className={styles.searchRow}>
            <input
              id="trazi"
              type="text"
              placeholder="Upiši email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
            />
            <button
              onClick={handleSearch}
              disabled={loading}
              className={styles.searchButton}
            >
              {loading ? "Tražim..." : "Pronađi"}
            </button>
          </div>
        </div>
  
        {error && <div className={styles.error}>{error}</div>}
  
        {user && (
          <div className={styles.userCard}>
            <div className={styles.userInfo}>
              <p className={styles.name}>
                {user.first_name} {user.last_name}
              </p>
              <p className={styles.email}>{user.email}</p>
            </div>
  
            <div className={styles.permissionRow}>
              <span>
                Može kreirati lokacije:
                <strong>
                  {user.can_create_venue ? " DA" : " NE"}
                </strong>
              </span>
  
              <button
                onClick={handleTogglePermission}
                disabled={loading}
                className={
                  user.can_create_venue
                    ? styles.removeButton
                    : styles.addButton
                }
              >
                {user.can_create_venue
                  ? "Makni dopuštenje"
                  : "Omogući dodavanje"}
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}