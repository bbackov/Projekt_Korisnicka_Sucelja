import DashboardLayout from "@/components/layout/DashboardLayout";
import WelcomeCard from "@/components/home/WelcomeCard";

export default function HomePage() {
  return (
    <DashboardLayout>
      {/* Kontejner s paddingom koji se prilagođava mobitelu (px-4) i desktopu (md:px-8) */}
      <main className="flex flex-col gap-6 p-4 md:p-8 max-w-7xl mx-auto w-full">
        
        <WelcomeCard />

        {/* Grid sustav koji je na mobitelu 1 stupac, a na desktopu 2 stupca */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {/* Ovdje će ići tvoji budući kartice */}
           {/* <NextBookingCard /> */}
           {/* <StatsOverview /> */}
        </div>

      </main>
    </DashboardLayout>
  );
}