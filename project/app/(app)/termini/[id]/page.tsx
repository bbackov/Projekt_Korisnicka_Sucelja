import { SPORT_DOGADJAJI } from "../data";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function DetaljiPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = SPORT_DOGADJAJI.find(t => t.id === Number(id));

  if (!item) notFound();

  const isFull = item.prijavljeno >= item.kapacitet;

  return (
    <div style={{ padding: "40px", maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
      <Link href="/termini" style={{ color: "#666" }}>← Povratak na popis</Link>
      
      <div style={{ marginTop: "30px", background: "white", padding: "40px", borderRadius: "25px", boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}>
        <span style={{ fontSize: "60px" }}>X</span>
        <h1 style={{ margin: "10px 0" }}>{item.aktivnost}</h1>
        <p style={{ background: "#e8f5e9", color: "#2e7d32", display: "inline-block", padding: "5px 15px", borderRadius: "20px", fontWeight: "bold" }}>
          BESPLATNO
        </p>
        
        <div style={{ textAlign: "left", marginTop: "30px" }}>
          <p><strong>Lokacija:</strong> {item.lokacija}</p>
          <p><strong>Vrijeme dogovora:</strong> {item.vrijeme}</p>
          <p><strong>Opis:</strong> {item.opis}</p>
          <p><strong>Trenutno prijavljenih:</strong> {item.prijavljeno} od maksimalno {item.kapacitet}</p>
        </div>

        {!isFull ? (
          <button style={{ 
            width: "100%", 
            marginTop: "30px", 
            padding: "15px", 
            backgroundColor: "#28a745", 
            color: "white", 
            border: "none", 
            borderRadius: "10px", 
            fontSize: "18px", 
            cursor: "pointer" 
          }}>
            Prijavi se i dođi!
          </button>
        ) : (
          <p style={{ marginTop: "30px", color: "#dc3545", fontWeight: "bold" }}>Žao nam je, grupa je trenutno popunjena!</p>
        )}
      </div>
    </div>
  );
}