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
import { formatVrijeme } from "@/util/toDate";


type QuickActionCardProps = {
    variant?: "list" | "home";
};

export default function QuickActionCard({ variant = "list" }: QuickActionCardProps){

    const [sports,setSports]=useState<SportDogadjaj[]>([]);

    useEffect(()=>{
        const loadSports = async()=>{
            const randomSports=await RandomThree();
            setSports(randomSports);
        }

        loadSports();

    },[]);


    return (
        
            <div className={`${styles.list} ${variant === "home" ? styles.home : ""}`}>
                {sports.map((sport) => {
                    const meta = SPORT_META[sport.tip] ?? SPORT_META.OTHER;
                    const full=(sport.prijavljeno / sport.kapacitet) ===1;

                return (
                    <div key={sport.id} className={styles.item}>
                        <div className={styles.iconWrapper} style={{ background: meta.gradient }}>
                            <Icon icon={meta.icon} width={28} className={styles.icon} />
                        </div>
            
                        <div className={styles.info}>
                            <div className={styles.header}>
                            <h4 className={styles.aktivnost}>{sport.aktivnost}</h4>
                            <span className={full ? `${styles.badgeFull}` : `${styles.badge}`}>{full ? "Popunjeno" : "Odaberi aktivnost"}</span>
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
                                <div className={styles.metaBottom}>
                                    <div className={styles.metaItem}>
                                        <Clock/> 
                                        <p>{formatVrijeme(sport.vrijeme)}</p>
                                    </div>
                                </div>
                            </div>
            
                            <Link href={`/termini/${sport.id}`} className={styles.details}>
                                <div className={styles.metaItem}>
                                <p>Detalji</p>
                                <ArrowRight/>
                                </div>
                            </Link>
                        </div>
                    </div>
              );
            })}
            </div>
      );
    }

