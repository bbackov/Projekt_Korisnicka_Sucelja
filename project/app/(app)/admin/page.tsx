import { redirect } from "next/navigation";
import AdminPanel from "./AdminPanel";
import { createClient as createServerClient } from "@/lib/supabase/server";

export default async function AdminPage() {
  const server = await createServerClient();
  const {
    data: { user },
  } = await server.auth.getUser();

  if (!user) {
    redirect("/authentication/login");
  }

  // Admin check iz baze 
  const { data: prof, error: profErr } = await server
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single();

  if (profErr || !prof?.is_admin) {
    redirect("/");
  }

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px" }}>
      <AdminPanel />
    </main>
  );
}