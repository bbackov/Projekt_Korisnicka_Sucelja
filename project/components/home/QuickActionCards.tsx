"use client";

import { useState } from "react";
import { useEffect } from "react";
import { RandomThree } from "@/app/(app)/termini/randomThree";
import type { SportDogadjaj } from "@/app/(app)/termini/data";
import Card from "../common/ui/Card";
import Link from "next/link";
import styles from "./QuickActionCard.module.css"



export default function QuickActionCard(){

    const [sports,setSports]=useState<SportDogadjaj[]>([]);

    useEffect(()=>{
        const loadSports = async()=>{
            const randomSports=await RandomThree();
            setSports(randomSports);
        }

        loadSports();

    },[]);


    return(
        <Card title="Odaberi aktivnost">
            <ul className={styles.list}>
                {sports.map(sport=>(
                    <li key={sport.id} className={styles.item}>
                        <div className={styles.info}>
                            <div className={styles.header}>
                            <span className={styles.icon}>{sport.ikona}</span> 
                            <span className={styles.aktivnost}>{sport.aktivnost}</span>
                            </div>                       
                            <span className={styles.title}>{sport.opis}</span>
                            <Link href={`/termini/${sport.id}`} className={styles.button}>Details</Link>
                        </div>
                    </li>
                ))}
            </ul>
        </Card>
    )
}
