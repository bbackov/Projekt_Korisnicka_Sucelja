"use client";

import styles from "./termini.module.css";
import CreateEventForm from "./CreateEventForm";

type Props = {
  onClose: () => void;
  onCreated: (event: any) => void;
};

export default function CreateEventModal({ onClose, onCreated }: Props) {
  return (
    <div className={styles.overlay} onClick={onClose} suppressHydrationWarning={true}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()} suppressHydrationWarning={true}>
        <button className={styles.close} onClick={onClose} suppressHydrationWarning={true}>✕</button>
        <h2>Kreiraj novi termin</h2>
        <CreateEventForm
          onCancel={onClose}
          onSuccess={(ev) => {
            onCreated(ev);
            onClose();
          }}
        />
      </div>
    </div>
  );
}
