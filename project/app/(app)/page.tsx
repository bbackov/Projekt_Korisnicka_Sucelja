import DashboardLayout from "@/components/layout/DashboardLayout";
import WelcomeCard from "@/components/home/WelcomeCard";

export default function HomePage() {
  return (
    <DashboardLayout>
      {/* MAIN CONTENT */}
      <WelcomeCard />

      {/* kasnije ide */}
      {/* <NextBookingCard /> */}
      {/* <StatsOverview /> */}
    </DashboardLayout>
  );
}