"use client";

import "./globals.css";
import { Manrope } from "next/font/google";
import { AuthProvider } from "./authentication/auth/AuthContext";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hr">
      <body className={manrope.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}