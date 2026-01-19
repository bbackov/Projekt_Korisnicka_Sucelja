"use client";

import Sidebar from "./Sidebar";
import RightPanel from "./RightPanel";
import styles from "./HomeDashboardLayout.module.css";


type DashboardLayoutProps = {
    children: React.ReactNode;
  };
  
  export default function HomeDashboardLayout({ children }: DashboardLayoutProps) {
    return (
      <div className={styles.dashboard}>
        <aside className={styles.sidebar}>
          <Sidebar />
        </aside>
  
        <main className={styles.main}>
          {children}
        </main>
  
        <aside className={styles.right}>
          <RightPanel />
        </aside>
      </div>
    );
  }