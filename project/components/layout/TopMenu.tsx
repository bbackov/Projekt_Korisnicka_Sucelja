"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Calendar, MapPin, Users, LogOut, Dumbbell, Menu, X } from "lucide-react";

export default function TopMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home", icon: Home },
    { href: "/termini", label: "Termini", icon: Calendar },
    { href: "/venues", label: "Venues", icon: MapPin },
    { href: "/friends", label: "Friends", icon: Users },
  ];

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-[100] w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* LOGO - Usklađen s Terminima (Blue-600 ikona + Black text) */}
          <div className="flex items-center gap-2">
            <Dumbbell size={28} className="text-blue-600" />
            <span className="text-2xl font-black text-gray-900 tracking-tighter uppercase">
              MatchTrack
            </span>
          </div>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-4">
            {links.map((l) => {
              const isActive = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                    isActive 
                    ? "text-blue-600 bg-blue-50" 
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <l.icon size={18} />
                  <span>{l.label}</span>
                </Link>
              );
            })}
            
            <div className="h-6 w-[1px] bg-gray-100 mx-2"></div>

            <button className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-red-600 font-bold text-sm transition-colors group">
              <LogOut size={18} className="group-hover:translate-x-1 transition-transform" />
              <span>LOGOUT</span>
            </button>
          </div>

          {/* HAMBURGER BUTTON - Mobitel */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="p-2 text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div className={`md:hidden bg-white border-b border-gray-100 transition-all duration-300 overflow-hidden ${
        isOpen ? "max-h-screen opacity-100 border-t border-gray-50" : "max-h-0 opacity-0"
      }`}>
        <div className="px-4 py-6 space-y-2">
          {links.map((l) => {
            const isActive = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-4 px-6 py-4 rounded-2xl font-black text-sm tracking-wide transition-all ${
                  isActive 
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" 
                  : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <l.icon size={20} />
                <span className="uppercase">{l.label}</span>
              </Link>
            );
          })}
          
          <button className="flex items-center gap-4 px-6 py-4 w-full text-left text-red-500 font-black text-sm tracking-wide hover:bg-red-50 rounded-2xl transition-all uppercase">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
}