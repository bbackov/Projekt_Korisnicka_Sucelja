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

export async function RegisterUser(data: RegisterData): Promise<RegisterResult> {
  const supabase = createClient();

  const { error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      emailRedirectTo:
        process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ||
        `${window.location.origin}/home`,
      data: {
        first_name: data.firstName,
        last_name: data.lastName,
      },
    },
  });

  if (error) {
    // Handle duplicate user
    if (error.message.includes("already registered") || error.message.includes("already been registered")) {
      return { success: false, error: "Korisnik s ovim emailom vec postoji" };
    }
    return { success: false, error: error.message };
  }

  return { success: true };
}

export async function LoginUser(data: LoginData): Promise<LoginResult> {
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });

  if (error) {
    if (error.message === "Invalid login credentials") {
      return { success: false, error: "Email ili lozinka su krivi" };
    }
    if (error.message.includes("Email not confirmed")) {
      return { success: false, error: "Potvrdite email prije prijave" };
    }
    return { success: false, error: error.message };
  }

  return { success: true };
}
