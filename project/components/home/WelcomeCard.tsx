import Link from "next/link";
import Card from "../common/ui/Card";
import styles from "./WelcomeCard.module.css"

export default function WelcomeCard() {
  return (
    <Card>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Dobrodošao 👋</h1>

        <p className={styles.text}>Pronađi sportske aktivnosti u svojoj blizini i pridruži se zajednici.</p>

        <Link href="/termini" className={styles.button}>Pogledaj termine </Link>
      </div>
    </Card>
  );
}