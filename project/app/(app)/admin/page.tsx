import { redirect } from "next/navigation";
import AdminPanel from "./AdminPanel";
import { createClient as createServerClient } from "@/lib/supabase/server";

export default async function AdminPage() {
  const server = await createServerClient();
  const {
    data: { user },
  } = await server.auth.getUser();

  // Not logged in -> go to login
  if (!user) {
    redirect("/authentication/login");
  }

  // Admin whitelist (server-side)
  const raw = process.env.ADMIN_EMAILS ?? "";
  const adminEmails = raw
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean);

  const email = user.email ?? "";
  if (!adminEmails.includes(email)) {
    // Not admin -> go home (or swap to notFound() if you prefer)
    redirect("/");
  }

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px" }}>
      <AdminPanel />
    </main>
  );
}