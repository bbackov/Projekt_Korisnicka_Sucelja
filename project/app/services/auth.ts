import { createClient } from "@/lib/supabase/client";

type RegisterData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type RegisterResult = { success: true } | { success: false; error: string };

type LoginData = {
  email: string;
  password: string;
};

type LoginResult = { success: true } | { success: false; error: string };

/**
 * Registers a new user with Supabase, without requiring email confirmation.
 */
export async function RegisterUser(data: RegisterData): Promise<RegisterResult> {
  try {
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      }),
    })

    const json = await res.json()

    if (!res.ok || json?.success === false) {
      const msg = json?.error ?? 'Neuspjela registracija'
      if (typeof msg === 'string' && (msg.includes('already registered') || msg.includes('already been registered') || msg.includes('already exists'))){
        return { success: false, error: 'Korisnik s ovim emailom vec postoji' }
      }
      return { success: false, error: String(msg) }
    }

    return { success: true }
  } catch (err: any) {
    return { success: false, error: err?.message ?? String(err) }
  }
}

/**
 * Logs in an existing user using email and password.
 */
export async function LoginUser(data: LoginData): Promise<LoginResult> {
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });

  if (error) {
    // Check invalid credentials
    if (error.message === "Invalid login credentials") {
      return { success: false, error: "Email ili lozinka su krivi" };
    }
    // Removed email not confirmed check
    return { success: false, error: error.message };
  }

  return { success: true };
}
