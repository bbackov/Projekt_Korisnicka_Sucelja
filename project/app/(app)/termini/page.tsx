import Link from "next/link";
import { SPORT_DOGADJAJI } from "./data";

export default async function DogadjajiPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ page?: string }> 
}) {
  const params = await searchParams;
  
  // 1. Trenutna stranica iz URL-a (zadani broj je 1)
  const currentPage = Number(params.page) || 1;
  
  // 2. Koliko stavki želimo po stranici
  const limit = 9; 
  
  // 3. Izračun početne i završne točke za rezanje niza (slice)
  const start = (currentPage - 1) * limit;
  const end = start + limit;
  
  // 4. Uzimamo samo dio podataka iz baze (npr. od 0 do 8, pa od 8 do 16...)
  const matches = SPORT_DOGADJAJI.slice(start, end);

  // 5. Izračun ukupnog broja stranica (40 / 8 = 5 stranica)
  const totalPages = Math.ceil(SPORT_DOGADJAJI.length / limit);

  return (
    <section style={{ padding: "30px", backgroundColor: "#f0f2f5", minHeight: "100vh" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <h1 style={{ textAlign: "center", marginBottom: "40px" }}>Aktivnosti u zajednici</h1>
        
        {/* Grid s karticama */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", 
          gap: "20px" 
        }}>
          {matches.map((item) => {
            const isFull = item.prijavljeno >= item.kapacitet;
            return (
              <div key={item.id} style={cardStyle}>
                <div style={{ fontSize: "40px" }}>{item.ikona}</div>
                <h3>{item.aktivnost}</h3>
                <p style={{ color: "#666", fontSize: "14px" }}>📍 {item.lokacija}</p>
                <p style={{ fontWeight: "bold", color: "#007bff" }}>🕒 {item.vrijeme}</p>
                
                {/* Progress bar */}
                <div style={progressContainerStyle}>
                  <div style={{ 
                    ...progressBarStyle, 
                    width: `${(item.prijavljeno / item.kapacitet) * 100}%`,
                    backgroundColor: isFull ? "#dc3545" : "#28a745"
                  }} />
                </div>
                <p style={{ fontSize: "12px" }}>{item.prijavljeno}/{item.kapacitet} mjesta</p>

                <Link href={`/termini/${item.id}`} style={{
                  ...btnStyle,
                  backgroundColor: isFull ? "#6c757d" : "#000"
                }}>
                  {isFull ? "Popunjeno - Vidi detalje" : "Pridruži se"}
                </Link>
              </div>
            );
          })}
        </div>

        {/* --- KONTROLE PAGINACIJE --- */}
        <div style={{ 
          marginTop: "50px", 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center", 
          gap: "15px" 
        }}>
          {/* Gumb Prethodna - prikazuje se samo ako nismo na prvoj stranici */}
          {currentPage > 1 ? (
            <Link href={`/termini?page=${currentPage - 1}`} style={navLinkStyle}>
              ← Prethodna
            </Link>
          ) : (
            <span style={{ ...navLinkStyle, color: "#ccc", cursor: "not-allowed" }}>← Prethodna</span>
          )}

          <div style={{ fontWeight: "bold" }}>
            Stranica {currentPage} od {totalPages}
          </div>

          {/* Gumb Sljedeća - prikazuje se samo ako ima još stranica */}
          {currentPage < totalPages ? (
            <Link href={`/termini?page=${currentPage + 1}`} style={navLinkStyle}>
              Sljedeća →
            </Link>
          ) : (
            <span style={{ ...navLinkStyle, color: "#ccc", cursor: "not-allowed" }}>Sljedeća →</span>
          )}
        </div>
      </div>
    </section>
  );
}

// Stilovi
const cardStyle = { background: "white", borderRadius: "15px", padding: "20px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" };
const progressContainerStyle = { background: "#eee", borderRadius: "10px", height: "8px", margin: "10px 0" };
const progressBarStyle = { height: "100%", borderRadius: "10px", transition: "width 0.3s" };
const btnStyle = { display: "block", marginTop: "15px", textAlign: "center" as const, padding: "10px", color: "white", borderRadius: "8px", textDecoration: "none", fontWeight: "bold" as const };
const navLinkStyle = { padding: "10px 20px", background: "white", border: "1px solid #ddd", borderRadius: "8px", textDecoration: "none", color: "#333" };