import Link from "next/link";
import { SPORT_DOGADJAJI } from "./data";
import TopMenu from "@/components/layout/TopMenu"; // Uvozimo tvoj novi Navbar s ikonama

export default async function DogadjajiPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ page?: string }> 
}) {
  const params = await searchParams;
  
  // Logika paginacije
  const currentPage = Number(params.page) || 1;
  const limit = 9; 
  const start = (currentPage - 1) * limit;
  const end = start + limit;
  const matches = SPORT_DOGADJAJI.slice(start, end);
  const totalPages = Math.ceil(SPORT_DOGADJAJI.length / limit);

  return (
    <div className="min-h-screen bg-white">
      {/* 1. NAVBAR - Tvoj novi TopMenu s ikonama i hamburgerom */}
      <TopMenu />

      {/* 2. GLAVNI SADRŽAJ */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Naslov sekcije */}
        <div className="mb-10">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            Aktivnosti u zajednici
          </h1>
          <p className="text-gray-500 font-medium">Pronađi ekipu i pridruži se sportskim terminima.</p>
        </div>
        
        {/* Grid s karticama - Responzivan: 1 kolona mobitel, 3 desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {matches.map((item) => {
            const isFull = item.prijavljeno >= item.kapacitet;
            const progressWidth = (item.prijavljeno / item.kapacitet) * 100;

            return (
              <div 
                key={item.id} 
                className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 group"
              >
                {/* Ikona i Naslov */}
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{item.ikona}</div>
                <h3 className="text-xl font-bold text-gray-800 uppercase tracking-tight">{item.aktivnost}</h3>
                
                {/* Detalji */}
                <div className="mt-3 space-y-1">
                  <p className="text-gray-500 text-sm flex items-center gap-2">📍 {item.lokacija}</p>
                  <p className="text-blue-600 font-bold text-sm flex items-center gap-2">🕒 {item.vrijeme}</p>
                </div>
                
                {/* Progress Bar (Tvoja originalna logika) */}
                <div className="mt-6">
                  <div className="flex justify-between text-[10px] font-black uppercase text-gray-400 mb-2">
                    <span>Popunjenost</span>
                    <span>{item.prijavljeno}/{item.kapacitet}</span>
                  </div>
                  <div className="bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-500 ${isFull ? 'bg-red-500' : 'bg-blue-600'}`}
                      style={{ width: `${progressWidth}%` }}
                    />
                  </div>
                </div>

                {/* Gumb za akciju */}
                <Link 
                  href={`/termini/${item.id}`} 
                  className={`block w-full mt-6 text-center py-4 rounded-2xl font-black text-sm transition-all active:scale-95 ${
                    isFull 
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                    : "bg-gray-900 text-white hover:bg-blue-600 shadow-lg shadow-gray-900/10"
                  }`}
                >
                  {isFull ? "POPUNJENO - VIDI DETALJE" : "PRIDRUŽI SE"}
                </Link>
              </div>
            );
          })}
        </div>

        {/* --- KONTROLE PAGINACIJE --- */}
        <div className="mt-16 flex flex-col sm:flex-row justify-center items-center gap-6">
          {currentPage > 1 ? (
            <Link 
              href={`/termini?page=${currentPage - 1}`} 
              className="px-6 py-2 border border-gray-200 rounded-xl font-bold text-sm hover:bg-gray-50 transition"
            >
              ← Prethodna
            </Link>
          ) : (
            <span className="px-6 py-2 border border-gray-50 rounded-xl text-gray-300 font-bold text-sm cursor-not-allowed">← Prethodna</span>
          )}

          <div className="font-bold text-sm text-gray-900 bg-gray-100 px-4 py-2 rounded-full">
            Stranica {currentPage} od {totalPages}
          </div>

          {currentPage < totalPages ? (
            <Link 
              href={`/termini?page=${currentPage + 1}`} 
              className="px-6 py-2 border border-gray-200 rounded-xl font-bold text-sm hover:bg-gray-50 transition"
            >
              Sljedeća →
            </Link>
          ) : (
            <span className="px-6 py-2 border border-gray-50 rounded-xl text-gray-300 font-bold text-sm cursor-not-allowed">Sljedeća →</span>
          )}
        </div>
      </main>
    </div>
  );
}