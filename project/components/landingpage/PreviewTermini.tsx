"use client";

import Card from "../common/ui/Card";
import QuickActionCard from "../home/QuickActionCards";
import Link from "next/link";
import styles from "./PreviewTermini.module.css"

export default function PreviewTermini(){


    return(
        <section className={styles.section}>
            <div className={styles.header}>
                <h2 className={styles.title}>Izdvojeni termini</h2>
                <span className={styles.underline} />
            </div>
            <Card>
                <div className={styles.cards}>
                    <QuickActionCard/>
                </div>
                <Link href="/termini" className={styles.button}>
                    Pogledaj sve termine
                </Link>
            </Card>
        </section>
    );
}