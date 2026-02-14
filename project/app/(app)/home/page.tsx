import HomeDashboardLayout from "@/components/layout/HomeDashboardLayout";
import WelcomeCard from "@/components/home/WelcomeCard";
import QuickStats from "@/components/home/QuickStats";
import QuickActionCard from "@/components/home/QuickActionCards";
import styles from "./home.module.css"

export default function HomePage() {
  return (
      <main>
        <WelcomeCard />
        <QuickStats />
        <section className={styles.recommended}>
            <h2 className={styles.title}>
                Preporučeno za tebe 
            </h2>
            <QuickActionCard  variant="home"/>
        </section>
      </main>
  );
}