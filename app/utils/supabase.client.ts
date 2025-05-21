import { createClient } from "@supabase/supabase-js";

// Create a client-side supabase client
export function getSupabaseClient() {
  if (typeof window === "undefined" || !window.ENV) {
    throw new Error("Window ENV is not available");
  }

  return createClient(
    window.ENV.SUPABASE_URL,
    window.ENV.SUPABASE_ANON_KEY
  );
}