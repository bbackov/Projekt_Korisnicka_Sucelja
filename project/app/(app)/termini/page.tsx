"use client";

import { Plus ,ArrowRight,MapPin,Users,Clock,ArrowLeft} from "lucide-react";
import { getDogadaji } from "./data";
import {useState } from "react";
import { useEffect } from "react";
import { SportDogadjaj } from "./data";
import { SPORT_META } from "@/components/common/ui/sportMeta";
import { Icon } from "@iconify/react";
import Link from "next/link";
import styles from "./termini.module.css"
import { formatVrijeme,isThisWeek,isToday } from "@/util/toDate";




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
      const data=await getDogadaji();
      setSports(data);
    }

    loadSports();
  },[]);


  return(
    <main className={styles.page}>
      <div className={styles.headerTop}>
        <div className={styles.headerText}>
          <h1>Aktivnosti u zajednici</h1>
          <p>Pronađi ekipu i pridruži se sportskim terminima ili kreiraj svoj termin.</p>
        </div>
        <div className={styles.headerActions}>
          <Link href={"ssss"}className={styles.createButton}><Plus/> Kreiraj novi termin</Link>
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
            
                <Link href={`/termini/${sport.id}`} className={styles.details}>
                    <p>Detalji</p>
                    <ArrowRight/>
                </Link>
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