"use client";

import { useState, useEffect } from "react";
import { createEvent } from "@/app/services/events";
import { showToast } from "@/app/services/toast";
import { getVenues } from "@/app/(app)/venues/data";
import type { Venue } from "@/app/(app)/venues/data";
import styles from "./termini.module.css";

type Props = {
  onSuccess: (event: any) => void;
  onCancel: () => void;
};

export default function CreateEventForm({ onSuccess, onCancel }: Props) {
  const [form, setForm] = useState({
    aktivnost: "",
    lokacija: "",
    vrijeme: "",
    kapacitet: 10,
    tip: "OTHER",
    opis: "",
    venueId: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [venues, setVenues] = useState<Venue[]>([]);

  useEffect(() => {
    const load = async () => {
      const v = await getVenues();
      setVenues(v);
    };
    load();
  }, []);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.aktivnost.trim()) newErrors.aktivnost = "Naziv je obavezan";
    if (!form.lokacija.trim()) newErrors.lokacija = "Lokacija je obavezna";
    if (!form.vrijeme.trim()) newErrors.vrijeme = "Vrijeme je obavezno";
    if (form.kapacitet < 1) newErrors.kapacitet = "Kapacitet mora biti > 0";
    if (!form.opis.trim()) newErrors.opis = "Opis je obavezan";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const change = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: name === 'kapacitet' ? Number(value) : value }));
    if (errors[name]) {
      setErrors((p) => ({ ...p, [name]: "" }));
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      showToast({ message: 'Popunite sve obavezne podatke', type: 'error' });
      return;
    }
    setLoading(true);
    const res = await createEvent(form);
    setLoading(false);
    if (res?.success) {
      showToast({ message: 'Aktivnost je uspješno kreirana', type: 'success' });
      onSuccess(res.event);
    } else {
      showToast({ message: res?.error ?? 'Neuspjelo kreiranje', type: 'error' });
    }
  };

  return (
    <form className={styles.createForm}>
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Naziv aktivnosti *</label>
        <input
          name="aktivnost"
          placeholder="Npr. Mali nogomet"
          value={form.aktivnost}
          onChange={change}
          className={styles.formInput}
        />
        {errors.aktivnost && <p className={styles.formError}>{errors.aktivnost}</p>}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Lokacija *</label>
        <select
          name="lokacija"
          value={form.lokacija}
          onChange={change}
          className={styles.formSelect}
        >
          <option value="">Odaberi lokaciju</option>
          {venues.map((venue) => (
            <option key={venue.id} value={venue.adresa}>
              {venue.naziv} ({venue.adresa})
            </option>
          ))}
        </select>
        {errors.lokacija && <p className={styles.formError}>{errors.lokacija}</p>}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Vrijeme *</label>
        <input
          name="vrijeme"
          type="datetime-local"
          value={form.vrijeme}
          onChange={change}
          className={styles.formInput}
        />
        {errors.vrijeme && <p className={styles.formError}>{errors.vrijeme}</p>}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Kapacitet (broj osoba) *</label>
        <input
          name="kapacitet"
          type="number"
          min="1"
          value={String(form.kapacitet)}
          onChange={change}
          className={styles.formInput}
        />
        {errors.kapacitet && <p className={styles.formError}>{errors.kapacitet}</p>}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Tip aktivnosti *</label>
        <select
          name="tip"
          value={form.tip}
          onChange={change}
          className={styles.formSelect}
        >
          <option value="OTHER">Ostalo</option>
          <option value="FOOTBALL">Nogomet</option>
          <option value="BASKETBALL">Košarka</option>
          <option value="VOLLEYBALL">Odbojka</option>
          <option value="TENNIS">Tenis</option>
          <option value="YOGA">Joga</option>
          <option value="RUNNING">Trčanje</option>
          <option value="CYCLING">Bicikliranje</option>
          <option value="SWIMMING">Plivanje</option>
          <option value="HIKING">Planinarenje</option>
        </select>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Opis aktivnosti *</label>
        <textarea
          name="opis"
          placeholder="Detaljnije opišite aktivnost..."
          value={form.opis}
          onChange={change}
          className={styles.formTextarea}
        />
        {errors.opis && <p className={styles.formError}>{errors.opis}</p>}
      </div>

      <div className={styles.formActions}>
        <button type="submit" disabled={loading} className={styles.formButtonSubmit}>
          {loading ? 'Kreiram...' : 'Kreiraj aktivnost'}
        </button>
        <button type="button" onClick={onCancel} className={styles.formButtonCancel}>
          Odustani
        </button>
      </div>
    </form>
  );
}

