"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Sidebar.module.css";
import { Home, Calendar, MapPin, LogOut, Dumbbell,  Shield , Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/app/authentication/auth/AuthContext";

export default function Sidebar() {
  const { logout, user } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const firstName = user?.user_metadata?.first_name || "";
  const lastName = user?.user_metadata?.last_name || "";
  const displayName = firstName && lastName ? `${firstName} ${lastName}` : user?.email?.split("@")[0] || "Korisnik";
  const displayEmail = user?.email || "";
  const avatarLetter = firstName ? firstName.charAt(0).toUpperCase() : displayEmail.charAt(0).toUpperCase();

  const adminList =
  process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(",").map((e) => e.trim()) ?? [];

  const isAdmin = adminList.includes(user?.email ?? "");

  const links = [
    { href: "/home", label: "Home", icon: Home },
    { href: "/termini", label: "Events", icon: Calendar },
    { href: "/venues", label: "Venues", icon: MapPin },
    ...(isAdmin ? [{ href: "/admin", label: "Admin", icon: Shield }] : []),
  ];

  return (
    <>
      <button className={styles.mobileToggle} onClick={() => setOpen((v) => !v)} aria-label="Otvori izbornik">
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      {open && (
        <div className={styles.overlay} onClick={() => setOpen(false)} />
      )}

      <aside className={`${styles.sidebar} ${open ? styles.open : ""}`}>
        <div className={styles.inner}>
          <header className={styles.header}>
            <div className={styles.logo}>
              <div className={styles.logoIcon}>
                <Dumbbell size={20} />
              </div>
              <span>MatchTrack</span>
            </div>

          </header>

          <nav className={styles.nav}>
            {links.map((l) => {
              const isActive = pathname === l.href;

              return (
                <Link key={l.href} href={l.href} className={`${styles.link} ${isActive ? styles.active : ""}`} onClick={() => setOpen(false)}>
                  <l.icon size={20} />
                  <span>{l.label}</span>
                </Link>
              );
            })}
          </nav>
          <footer className={styles.footer}>
            <div className={styles.userCard}>
              <div className={styles.avatar}>{avatarLetter}</div>
              <div>
                <p className={styles.name}>{displayName}</p>
                <p className={styles.email}>{displayEmail}</p>
              </div>
            </div>

            <button className={styles.logout} onClick={handleLogout}>
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </footer>
        </div>
      </aside>
    </>
  );
}
