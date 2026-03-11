import WelcomeCard from "@/components/home/WelcomeCard";
import QuickStats from "@/components/home/QuickStats";
import QuickActionCard from "@/components/home/QuickActionCards";
import Link from "next/link";
import styles from "./home.module.css";

import { isSanityConfigured, sanityClient } from "@/src/sanity/client";
import { HOMEPAGE_QUERY } from "@/src/sanity/queries";

type HomeCms = {
  heroTitle?: string;
  heroSubtitle?: string;
  heroBadge?: string;
  heroCtaText?: string;
  heroCtaHref?: string;

  nextStepsTitle?: string;
  nextStepsIntro?: string;
  primaryCtaText?: string;
  primaryCtaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  tipLabel?: string;
  tipText?: string;

  newsTitle?: string;
  newsItems?: Array<{
    title?: string;
    excerpt?: string;
    href?: string;
    date?: string;
    tag?: string;
    image?: { asset?: { url?: string } };
  }>;
};

export const revalidate = 60;

export default async function HomePage() {
  const cms =
    isSanityConfigured && sanityClient
      ? await sanityClient.fetch<HomeCms>(HOMEPAGE_QUERY)
      : null;

  return (
    <main>
      {/* HERO: samo proslijedi content (WelcomeCard ostaje komponenta) */}
      <WelcomeCard
        cmsTitle={cms?.heroTitle}
        cmsSubtitle={cms?.heroSubtitle}
        cmsBadge={cms?.heroBadge}
        cmsCtaText={cms?.heroCtaText}
        cmsCtaHref={cms?.heroCtaHref}
      />

      <QuickStats />

      <section className={styles.section}>
        <div className={styles.recommendedBlock}>
          <h2 className={styles.sectionTitle}>Preporuceno za tebe</h2>
          <QuickActionCard variant="home" />
        </div>

        <div className={styles.nextStepsCard}>
          <h3 className={styles.nextStepsTitle}>
            {cms?.nextStepsTitle ?? "Sljedeci koraci"}
          </h3>

          <p className={styles.nextStepsIntro}>
            {cms?.nextStepsIntro ??
              "Popuni tjedan aktivnostima i pronadi ekipu za trening."}
          </p>

          <div className={styles.nextStepsActions}>
            <Link
              href={cms?.primaryCtaHref ?? "/termini"}
              className={styles.primaryAction}
            >
              {cms?.primaryCtaText ?? "Pregledaj sve termine"}
            </Link>

            <Link
              href={cms?.secondaryCtaHref ?? "/venues"}
              className={styles.secondaryAction}
            >
              {cms?.secondaryCtaText ?? "Pronadi lokacije blizu sebe"}
            </Link>
          </div>

          <div className={styles.tipBox}>
            <p className={styles.tipLabel}>{cms?.tipLabel ?? "Brzi savjet"}</p>
            <p className={styles.tipText}>
              {cms?.tipText ??
                "Aktivnosti s manjim brojem prijavljenih se najbrze popune tijekom veceri."}
            </p>
          </div>
        </div>

        {/* NOVOSTI - FEATURED STYLE */}
        <div className={styles.newsSection}>
          <h3 className={styles.newsSectionTitle}>
            {cms?.newsTitle ?? "Novosti"}
          </h3>

          <div className={styles.newsList}>
            {(cms?.newsItems ?? []).map((item, idx) => (
              <div key={idx} className={styles.newsCard}>
                {item?.image?.asset?.url && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.image.asset.url}
                    alt={item?.title ?? "Novost"}
                    className={styles.newsHeroImage}
                  />
                )}

                <div className={styles.newsCardContent}>
                  <h4 className={styles.newsCardTitle}>
                    {item?.title ?? "Naslov novosti"}
                  </h4>

                  <p className={styles.newsCardText}>
                    {item?.excerpt ?? ""}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
