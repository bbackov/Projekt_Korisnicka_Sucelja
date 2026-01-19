"use client";


import styles from "./About.module.css"
import { Zap, Heart, Shield } from "lucide-react";

export default function About(){

    return (
        <section className={styles.section}>
            <div className={styles.inner}>
          
                <div className={styles.header}>
                <h2 className={styles.title}>O MatchTracku</h2>
                <span className={styles.underline} />
                </div>
    
            
                <p className={styles.description}>
                MatchTrack je web aplikacija razvijena u sklopu kolegija Korisnička sučelja.
                Cilj aplikacije je omogućiti jednostavno pronalaženje sportskih aktivnosti,
                povezivanje korisnika i organizaciju termina na pregledan i intuitivan način.
                </p>
    
            
                <div className={styles.features}>
                    <div className={styles.feature}>
                        <div className={`${styles.iconBox} ${styles.blue}`}>
                        <Zap />
                        </div>
                        <h3>Brzo i lako</h3>
                        <p>Pronađite i pridružite se aktivnostima u samo par klikova</p>
                    </div>
        
                    <div className={styles.feature}>
                        <div className={`${styles.iconBox} ${styles.purple}`}>
                        <Heart />
                        </div>
                        <h3>Zajednica</h3>
                        <p>Upoznajte nove ljude i izgradite sportsku mrežu</p>
                    </div>
        
                    <div className={styles.feature}>
                        <div className={`${styles.iconBox} ${styles.mix}`}>
                        <Shield />
                        </div>
                        <h3>Pouzdano</h3>
                        <p>Sigurna platforma za organizaciju svih vaših aktivnosti</p>
                    </div>
                </div>
            </div>
        </section>
      );
}