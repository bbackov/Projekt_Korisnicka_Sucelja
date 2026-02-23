import WelcomeCard from "@/components/home/WelcomeCard";
import QuickStats from "@/components/home/QuickStats";
import QuickActionCard from "@/components/home/QuickActionCards";
import Link from "next/link";
import styles from "./home.module.css";

import { sanityClient } from "@/src/sanity/client";
import { HOMEPAGE_QUERY } from "@/src/sanity/queries";

type HomeCms = {
  recommendedTitle?: string;
  nextStepsTitle?: string;
  nextStepsIntro?: string;
  primaryCtaText?: string;
  primaryCtaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  tipLabel?: string;
  tipText?: string;
};

export const revalidate = 60; // refresh svakih 60s (možeš stavit 0 dok testiraš)

export default async function HomePage() {
  const cms = await sanityClient.fetch<HomeCms>(HOMEPAGE_QUERY);

  const recommendedTitle = cms?.recommendedTitle ?? "Preporuceno za tebe";
  const nextStepsTitle = cms?.nextStepsTitle ?? "Sljedeci koraci";
  const nextStepsIntro =
    cms?.nextStepsIntro ?? "Popuni tjedan aktivnostima i pronadi ekipu za trening.";

  const primaryCtaText = cms?.primaryCtaText ?? "Pregledaj sve termine";
  const primaryCtaHref = cms?.primaryCtaHref ?? "/termini";

  const secondaryCtaText = cms?.secondaryCtaText ?? "Pronadi lokacije blizu sebe";
  const secondaryCtaHref = cms?.secondaryCtaHref ?? "/venues";

  const tipLabel = cms?.tipLabel ?? "Brzi savjet";
  const tipText =
    cms?.tipText ??
    "Aktivnosti s manjim brojem prijavljenih se najbrze popune tijekom veceri.";

  return (
    <main>
      <WelcomeCard />
      <QuickStats />

      <section className={styles.section}>
        <div className={styles.recommendedBlock}>
          <h2 className={styles.sectionTitle}>{recommendedTitle}</h2>
          <QuickActionCard variant="home" />
        </div>

        <div className={styles.nextStepsCard}>
          <h3 className={styles.nextStepsTitle}>{nextStepsTitle}</h3>
          <p className={styles.nextStepsIntro}>{nextStepsIntro}</p>

          <div className={styles.nextStepsActions}>
            <Link href={primaryCtaHref} className={styles.primaryAction}>
              {primaryCtaText}
            </Link>
            <Link href={secondaryCtaHref} className={styles.secondaryAction}>
              {secondaryCtaText}
            </Link>
          </div>

          <div className={styles.tipBox}>
            <p className={styles.tipLabel}>{tipLabel}</p>
            <p className={styles.tipText}>{tipText}</p>
          </div>
        </div>
      </section>
    </main>
  );
}