"use client";

import ActiveFriends from "../home/ActiveFriends";
import QuickActionCard from "../home/QuickActionCards";
import styles from "./RightPanel.module.css"

export default function RightPanel() {
    return (
      <div className={styles.rightPanel}>
        <ActiveFriends/>
        
        <QuickActionCard />
      </div>
    );
  }