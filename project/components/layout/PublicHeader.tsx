"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Calendar, MapPin, Dumbbell,LogIn,UserPlus, Menu, X } from "lucide-react";
import { useState } from "react";

import styles from "./PublicHeader.module.css";

export default function PublicHeader() {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  const links = [
    { href: "/", label: "Home", icon: Home },
    { href: "/termini", label: "Events", icon: Calendar },
    { href: "/venues", label: "Venues", icon: MapPin },
  ];

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <div className={styles.inner}>

          <div className={styles.logo}>
            <div className={styles.logoBadge}>
              <Dumbbell size={28}  />
            </div>
            <span className={styles.logoText}>MatchTrack</span>
          </div>

          <div className={styles.desktopNavLinks}>
            {links.map((l) => {
              const isActive = pathname === l.href;
              const Icon = l.icon;

              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`${styles.navLink} ${
                    isActive ? styles.active : ""
                  }`}
                >
                  <Icon size={18} />
                  <span>{l.label}</span>
                </Link>
              );
            })}
            </div>
            
            <div className={styles.desktopAuth}>
            <Link href="/authentication/login" className={styles.login}>
              <LogIn size={18} />
              <span>Login</span>
            </Link>

            <Link href="/authentication/register" className={styles.register}>
            <UserPlus size={18} />
            <span>Register</span>
            </Link>
            </div>

            <div className={styles.mobileActions}>
              <Link href="/authentication/register" className={styles.mobileRegisterInline}>
                <UserPlus className={styles.mobileRegisterIcon} size={18} />
                <span>Register</span>
              </Link>
              <button className={styles.mobileToggle} onClick={() => setOpen((v) => !v)}>
                {open ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>

          {open && (
          <div className={styles.mobileMenu}>
            {links.map((l) => (
              <Link key={l.href} href={l.href} className={styles.mobileLink} onClick={() => setOpen(false)}>
                <l.icon size={18} />
                <span>{l.label}</span>
              </Link>
            ))}

            <div className={styles.mobileDivider} />

            <Link href="/authentication/login" className={styles.mobileLink}  onClick={() => setOpen(false)}>
              <LogIn size={18} />
              <span>Login</span>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
