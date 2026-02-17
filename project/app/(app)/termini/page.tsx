"use client";

import { Plus ,ArrowRight,MapPin,Users,Clock,ArrowLeft, LogOut} from "lucide-react";
import { getDogadaji } from "./data";
import { registerForEvent, getMyRegistrations, unregisterFromEvent } from "@/app/services/events";
import { createClient } from "@/lib/supabase/client";
import CreateEventModal from "./CreateEventModal";
import {useState } from "react";
import { useEffect } from "react";
import { SportDogadjaj } from "./data";
import { SPORT_META } from "@/components/common/ui/sportMeta";
import { Icon } from "@iconify/react";
import Link from "next/link";
import styles from "./termini.module.css"
import { formatVrijeme,isThisWeek,isToday } from "@/util/toDate";
import { showToast } from "@/app/services/toast";




export default function TerminiPage(){


  const [sports,setSports]=useState<SportDogadjaj[]>([]);
  const [filter,setFilter]=useState({
    activity:"",
    sport:"All",
    city:"All",
    date:"All"
  });
  
  const filteredSports = sports.filter((sport) => {

    const matchesActivity =
      filter.activity.trim() === "" ||
      sport.aktivnost
        .toLowerCase()
        .includes(filter.activity.toLowerCase());
  

    const matchesCity =
      filter.city === "All" ||
      sport.lokacija.toLowerCase().includes(filter.city.toLowerCase());
  
 
    const matchesSport =
      filter.sport === "All" ||
      sport.tip === filter.sport;

    const matchesDate =
      filter.date === "All" ||
      (filter.date === "today" && isToday(new Date(sport.vrijeme))) ||
      (filter.date === "week" && isThisWeek(new Date(sport.vrijeme)));
  
    return matchesActivity && matchesCity && matchesSport&& matchesDate;
  });
  
  const [currentPage,setCurrentPage]=useState(1);
  const limitItems=9;
  const totalPages=Math.ceil(filteredSports.length/limitItems);
  const start = (currentPage - 1) * limitItems;
  const items=filteredSports.slice(start,start+limitItems);
  const uniqueSports = Array.from(
    new Set(sports.map(sport => sport.tip))
  );

  const uniqueCity = Array.from(
    new Set(sports.map(sport => sport.lokacija))
  );
  const [filterOpen,SetOpen]=useState(false)

  const handleFilter=(event:React.ChangeEvent<HTMLInputElement>| React.ChangeEvent<HTMLSelectElement>)=>{
    const {name,value}=event.target;
    setFilter(prev=>({
      ...prev,
      [name]:value
    }))
    setCurrentPage(1);

    if(value===""){
      SetOpen(false);
    }
    else{
      SetOpen(true);
    }
  }

  const handleDateFilter = (type: "today" | "week") => {
    if(type===filter.date){
      setFilter(prev => ({
        ...prev,
        date: "All"
      }));
    }else{
      setFilter(prev => ({
        ...prev,
        date: type
      }));
    }
    setCurrentPage(1);
    SetOpen(type !== filter.date);
  };


  const handleResetFilter=()=>{
    setFilter({
      activity:"",
      sport:"All",
      city:"All",
      date:"All"
    })
    
    setCurrentPage(1);
    SetOpen(false);
  }

  

  useEffect(()=>{

    const loadSports=async()=>{
      const data = await getDogadaji();
      setSports(data);

      // get current user and registrations
      try {
        const sup = createClient();
        const { data: userData } = await sup.auth.getUser();
        if (userData.user) {
          setLoggedIn(true)
          const reg = await getMyRegistrations();
          if (reg?.registered) setRegisteredIds(reg.registered as number[]);
        } else {
          setLoggedIn(false)
        }
      } catch (e) {
        setLoggedIn(false)
      }
    }

    loadSports();
  },[]);

  const [registeredIds, setRegisteredIds] = useState<number[]>([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [loadingRegister, setLoadingRegister] = useState<number | null>(null);
  const [loadingUnregister, setLoadingUnregister] = useState<number | null>(null);


  return(
    <main className={styles.page}>
      {createOpen && (
        <CreateEventModal
          onClose={() => setCreateOpen(false)}
          onCreated={(ev) => {
            // refresh list: re-fetch events
            getDogadaji().then((d) => setSports(d))
          }}
        />
      )}
      <div className={styles.headerTop}>
        <div className={styles.headerText}>
          <h1>Aktivnosti u zajednici</h1>
          <p>Pronađi ekipu i pridruži se sportskim terminima ili kreiraj svoj termin.</p>
        </div>
        <div className={styles.headerActions}>
          <button onClick={() => setCreateOpen(true)} className={styles.createButton}><Plus/> Kreiraj novi termin</button>
        </div>
        <div className={styles.filtersWrapper}>
          <div className={styles.filters}>
            <div className={styles.searchGroup}>
              <label htmlFor="search-activities">Pretraži aktivnost</label>
              <input
                id="search-activities"
                name="activity"
                type="text"
                placeholder="Pretraži aktivnosti..."
                onChange={handleFilter}
                value={filter.activity ?? ""}
              />
              </div>
              <div className={styles.filterControls}>
                <button className={`${styles.filterButton} ${filter.date === "today" ? styles.active : ""}`} onClick={() => handleDateFilter("today")}>Danas</button>
                <button className={`${styles.filterButton} ${filter.date === "week" ? styles.active : ""}`} onClick={() => handleDateFilter("week")}>Ovaj tjedan</button>
                <select
                  name="sport"
                  value={filter.sport}
                  onChange={handleFilter}
                  className={styles.select}
                >
                  <option value="All">Svi sportovi</option>
                  {uniqueSports.map((sport)=>{
                    return(<option key={sport} value={sport}>{sport}</option>);
                  })}
                </select>

                <select
                  name="city"
                  value={filter.city}
                  onChange={handleFilter}
                  className={styles.select}
                >
                  <option value="All">Sve lokacije</option>
                  {uniqueCity.map((city)=>{
                    return(<option key={city} value={city}>{city}</option>);
                  })}
                </select>

                {filterOpen&&<button onClick={handleResetFilter}  className={styles.clearFilters}>Očisti filtere</button>}
              </div>
            </div>
        </div>
      </div>
      <div className={styles.grid}>
        {items.map((sport)=>{
          const meta = SPORT_META[sport.tip] ?? SPORT_META.OTHER;
          const full=(sport.prijavljeno / sport.kapacitet) ===1;
          return(
            <div key={sport.id} className={styles.card}>
              <div className={styles.iconWrapper} style={{ background: meta.gradient }}>
                <Icon icon={meta.icon} width={28} className={styles.icon} />
              </div>
            
              <div className={styles.info}>
                <div className={styles.cardHeader}>
                    <h4 className={styles.aktivnost}>{sport.aktivnost}</h4>
                    <span className={full ? `${styles.badgeFull}` : `${styles.badge}`}>{full ? "Popunjeno" : "Odaberi aktivnost"}</span>
                </div>
            
                <p className={styles.opis}>{sport.opis}</p>
            
                <div className={styles.meta}>
                  <div className={styles.metaItem}>
                    <MapPin/>
                    <p>{sport.lokacija}</p>
                  </div>
                  <div className={styles.metaItem}>
                    <Users/>
                    <p>{sport.prijavljeno}/{sport.kapacitet}</p>
                  </div>
                  <div className={styles.metaBottom}>
                    <div className={styles.metaItem}>
                      <Clock/> 
                      <p>{formatVrijeme(sport.vrijeme)}</p>
                    </div>
                  </div>
                </div>
            
                <div className={styles.actionsRow}>
                  <Link href={`/termini/${sport.id}`} className={styles.details}>
                    <p>Detalji</p>
                    <ArrowRight/>
                  </Link>
                  
                  {loggedIn && registeredIds.includes(sport.id) ? (
                    <button
                      className={styles.unregisterButton}
                      disabled={loadingUnregister === sport.id}
                      onClick={async () => {
                        setLoadingUnregister(sport.id)
                        const res = await unregisterFromEvent(sport.id)
                        setLoadingUnregister(null)
                        if (res?.success) {
                          setSports((prev) =>
                            prev.map((p) => (p.id === sport.id ? { ...p, prijavljeno: Math.max(0, p.prijavljeno - 1) } : p))
                          )
                          setRegisteredIds((prev) => prev.filter((id) => id !== sport.id))
                          showToast({ message: 'Odjavljeni ste s aktivnosti', type: 'success' })
                        } else {
                          showToast({ message: res?.error ?? 'Greška pri odjavi', type: 'error' })
                        }
                      }}
                    >
                      <LogOut size={16} /> {loadingUnregister === sport.id ? 'Odjava...' : 'Odjava'}
                    </button>
                  ) : loggedIn && !registeredIds.includes(sport.id) && !full ? (
                    <button
                      className={styles.registerButton}
                      disabled={loadingRegister === sport.id}
                      onClick={async () => {
                        setLoadingRegister(sport.id)
                        const res = await registerForEvent(sport.id)
                        setLoadingRegister(null)
                        if (res?.success) {
                          setSports((prev) =>
                            prev.map((p) => (p.id === sport.id ? { ...p, prijavljeno: p.prijavljeno + 1 } : p))
                          )
                          setRegisteredIds((prev) => [...prev, sport.id])
                          showToast({ message: 'Uspješno ste se prijavili', type: 'success' })
                        } else {
                          showToast({ message: res?.error ?? 'Neuspjela prijava', type: 'error' })
                        }
                      }}
                    >
                      {loadingRegister === sport.id ? 'Pridruživanje...' : 'Pridruži se'}
                    </button>
                  ) : loggedIn && full && !registeredIds.includes(sport.id) ? (
                    <button className={styles.fullButton} disabled>Popunjeno</button>
                  ) : !loggedIn ? (
                    <button className={styles.loginNotice} onClick={() => window.location.href = '/authentication/login'}>Prijavi se</button>
                  ) : null}
                </div>
              </div>    
            </div>
          );
        })}
        </div>
        <div className={styles.pagination}>
          <div className={styles.side}>
            {currentPage>1 &&(
            <button onClick={()=>setCurrentPage(prev=>prev-1)} className={styles.pageButton}>
              <ArrowLeft/> Prethodna
            </button>
            )}
          </div> 

          <p className={styles.pageInfo}> Stranica {currentPage} od {totalPages}</p>
          <div className={styles.side}>
            {currentPage<totalPages &&(
            <button onClick={()=>setCurrentPage(prev=>prev+1)} className={styles.pageButton}>
              <ArrowRight/> Sljedeća
            </button>
          )}
          </div>
        </div>
    </main>

  );

}