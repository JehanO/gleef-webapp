// src/lib/supabase/server.ts
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const createClient = async () => {
  const cookieStore = cookies();

  // Custom cookie getter to handle potential parsing errors
  const safeCookieGet = () => {
    try {
      return cookieStore.getAll().map(cookie => ({
        name: cookie.name,
        value: cookie.value
      }));
    } catch (error) {
      console.warn("Error parsing cookies:", error);
      return [];
    }
  };

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return safeCookieGet();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch (error) {
            console.warn("Error setting cookies:", error);
          }
        },
      },
    }
  );
};