"use client";

import { useAuth } from "../authentication/auth/AuthContext";
import HomeDashboardLayout from "@/components/layout/HomeDashboardLayout";
import PublicHeader from "@/components/layout/PublicHeader";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <p>Ucitavanje...</p>
      </div>
    );
  }

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
