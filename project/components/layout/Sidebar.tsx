"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Sidebar.module.css";
import { Home, Calendar, MapPin, Users, LogOut, Dumbbell ,Bell,Menu,X} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/app/authentication/auth/AuthContext";

export default function Sidebar() {

  const { logout } = useAuth();
  const pathname = usePathname();
  const router =useRouter();

  const[open,setOpen]=useState(false);

  const handleLogout=()=>{
    logout();
    router.push("/");
  }

  const links = [
    { href: "/home", label: "Home", icon: Home },
    { href: "/termini", label: "Events", icon: Calendar },
    { href: "/venues", label: "Venues", icon: MapPin },
    { href: "/friends", label: "Friends", icon: Users },
  ];

  return (
    <>
      <button className={styles.mobileToggle} onClick={() => setOpen((v) => !v)}>
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>


      {open && (
        <div className={styles.overlay}onClick={() => setOpen(false)}/>
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

            <button className={styles.bell}>
              <Bell size={20} />
            </button>
          </header>

          <nav className={styles.nav}>
            {links.map((l) => {
              const isActive = pathname === l.href;

              return (
                <Link key={l.href} href={l.href} className={`${styles.link} ${isActive ? styles.active : ""}`}onClick={() => setOpen(false)}>
                  <l.icon size={20} />
                  <span>{l.label}</span>
                </Link>
              );
            })}
          </nav>
          <footer className={styles.footer}>
            <div className={styles.userCard}>
              <div className={styles.avatar}>N</div>
              <div>
                <p className={styles.name}>Nikola</p>
                <p className={styles.email}>nikola@example.com</p>
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
