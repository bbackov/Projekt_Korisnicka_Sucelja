"use client";

import Card from "../common/ui/Card";
import Link from "next/link";
import styles from "./VenuesPreview.module.css"
import { MapPin } from "lucide-react";

export default function VenuesPreview(){


    return(
        <section className={`${styles.section} ${styles.sticky}`}>
            <div className={styles.header}>
                <h2 className={styles.title}>Sportske lokacije</h2>
                <span className={styles.underline} />
            </div>
            <Card>
                <div className={styles.card}>
                <div className={styles.iconWrapper}>
                    <MapPin className={styles.icon} />
                </div>
                
                <h3 className={styles.cardTitle}>Otkrijte vrhunske lokacije</h3>

                    <p className={styles.description}>
                        MatchTrack omogućuje pregled sportskih lokacija poput{" "}
                        <span>dvorana</span>, <span>igrališta</span> i{" "}
                        <span>vanjskih terena</span> na kojima se organiziraju termini.
                    </p>
                    <Link href="/termini" className={styles.button}>
                        Pogledaj lokacije
                    </Link>
                </div>
            </Card>
        </section>
    );
}