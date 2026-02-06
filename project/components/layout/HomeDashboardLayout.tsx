"use client";

import Sidebar from "./Sidebar";
import styles from "./HomeDashboardLayout.module.css";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default function HomeDashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className={styles.dashboard}>
      <Sidebar />

      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
}
