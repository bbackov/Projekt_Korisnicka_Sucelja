
import PublicHeader from "@/components/layout/PublicHeader";
import HeroCard from "@/components/landingpage/HeroCard";
import PreviewTermini from "@/components/landingpage/PreviewTermini";
import VenuesPreview from "@/components/landingpage/VenuesPreview";
import styles from "@/components/landingpage/LandingPage.module.css";
import About from "@/components/landingpage/About";
import Footer from "@/components/landingpage/Footer";

export default function LandingPage() {
  return (
    <div>
      <PublicHeader />

      <main>
        <HeroCard />
        <div className={styles.heroPreviewWrap}>
          <div className={styles.section}>  
            <PreviewTermini />   
            <VenuesPreview /> 
          </div>
        </div>      
        <About />
      </main>

      <Footer />
    </div>
  );
}