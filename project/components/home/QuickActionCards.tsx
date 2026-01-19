"use client";

import { useState } from "react";
import { useEffect } from "react";
import { RandomThree } from "@/app/(app)/termini/randomThree";
import type { SportDogadjaj } from "@/app/(app)/termini/data";
import Link from "next/link";
import styles from "./QuickActionCard.module.css"
import { SPORT_META } from "../common/ui/sportMeta";
import { Icon } from "@iconify/react";
import {MapPin, Users, Clock, ArrowRight} from "lucide-react"


export default function QuickActionCard(){

    const [sports,setSports]=useState<SportDogadjaj[]>([]);

    useEffect(()=>{
        const loadSports = async()=>{
            const randomSports=await RandomThree();
            setSports(randomSports);
        }

        loadSports();

    },[]);


    return (
        
            <ul className={styles.list}>
                {sports.map((sport) => {
                    const meta = SPORT_META[sport.tip] ?? SPORT_META.OTHER;
    
                return (
                    <li key={sport.id} className={styles.item}>
                        <div className={styles.iconWrapper} style={{ background: meta.gradient }}>
                            <Icon icon={meta.icon} width={28} className={styles.icon} />
                        </div>
            
                        <div className={styles.info}>
                            <div className={styles.header}>
                            <h4 className={styles.aktivnost}>{sport.aktivnost}</h4>
                            <span className={styles.badge}>Odaberi aktivnost</span>
                        </div>
            
                            <p className={styles.opis}>{sport.opis}</p>
            
                            <div className={styles.meta}>
                                <div className={styles.metaItem}>
                                    <MapPin/>
                                    <p>{sport.lokacija}</p>
                                </div>
                                <div className={styles.metaItem}>
                                    <Users/>
                                    <p>{sport.prijavljeno}/{sport.kapacitet}</p>
                                </div>
                                <div className={styles.metaItem}>
                                    <Clock/> 
                                    <p>{sport.vrijeme}</p>
                                </div>
                            </div>
            
                            <Link href={`/termini/${sport.id}`} className={styles.details}>
                                <div className={styles.metaItem}>
                                <p>Detalji</p>
                                <ArrowRight/>
                                </div>
                            </Link>
                        </div>
                    </li>
              );
            })}
            </ul>
      );
    }

