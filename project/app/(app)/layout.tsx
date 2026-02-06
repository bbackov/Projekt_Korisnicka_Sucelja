"use client";

import { AuthProvider,useAuth } from "../authentication/auth/AuthContext";
import HomeDashboardLayout from "@/components/layout/HomeDashboardLayout";
import PublicHeader from "@/components/layout/PublicHeader";

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return (
      <HomeDashboardLayout>
        {children}
      </HomeDashboardLayout>
    );
  }

  return (
    <>
      <PublicHeader />
      <main>{children}</main>
    </>
  );
}

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <LayoutContent>{children}</LayoutContent>
    </AuthProvider>
  );
}