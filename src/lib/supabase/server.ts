/**
 * DEADCODE LABS — Server-Only Supabase Client
 *
 * Uses the service role key for privileged server-side operations.
 * NEVER import this file from a client component or browser code.
 * NEVER prefix SUPABASE_SERVICE_ROLE_KEY with NEXT_PUBLIC_.
 */

import { createClient } from "@supabase/supabase-js";

function createServerSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error(
      "[Supabase] Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. " +
        "Ensure both are set in your .env.local (service key must NOT be prefixed with NEXT_PUBLIC_)."
    );
  }

  return createClient(url, serviceKey, {
    auth: {
      // Disable auto session management — we never want user sessions server-side
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
  });
}

/**
 * Call this inside API route handlers only. Each call creates a fresh
 * client (stateless), so it's safe to call once per request.
 */
export function getServerSupabaseClient() {
  return createServerSupabaseClient();
}
