import Link from "next/link";
import "./globals.css";

export const metadata = { title: "MatchTrack", description: "Early draft" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const links = [
    { href: "/", label: "Home" },
    { href: "/matches", label: "Matches" },
    { href: "/teams", label: "Teams" },
    { href: "/players", label: "Players" },
    { href: "/venues", label: "Venues" },
    { href: "/termini", label: "Termini" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/authentication/login", label: "Login" },
    { href: "/authentication/register", label: "Register" },
  ];

  return (
    <html lang="en">
      <body>
        <nav style={{ display: "flex", gap: 12, padding: 12, borderBottom: "1px solid #ddd" }}>
          {links.map(l => <Link key={l.href} href={l.href}>{l.label}</Link>)}
        </nav>
        <main style={{ padding: 16 }}>{children}</main>
      </body>
    </html>
  );
}