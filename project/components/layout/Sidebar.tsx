"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Sidebar.module.css";
import { Home, Calendar, MapPin, Users, LogOut, Dumbbell } from "lucide-react";

export default function Sidebar() {

  const pathname = usePathname();

 

  const links = [
    { href: "/", label: "Home", icon: Home },
    { href: "/termini", label: "Termini", icon: Calendar },
    { href: "/venues", label: "Venues", icon: MapPin },
    { href: "/friends", label: "Friends", icon: Users },
  ];

  return (
    <div>
      <nav className={styles.sidebar}>
        <div className={styles.logo}>
          <Dumbbell size={22} />
          <span>MatchTrack</span>  
        </div> 
    
        <ul className={styles.nav}>
        {links.map(l => {
          const isActive = pathname === l.href;

          return (
            <li key={l.href}>
              <Link
              href={l.href}
              className={`${styles.link} ${isActive ? styles.active : ""}`}>
                <l.icon size={18} />
                <span>{l.label}</span>
              </Link>
            </li>
          );
        })}
        </ul>
        <button className={styles.logout}>
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </nav>
    </div>
  );
}