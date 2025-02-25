// src/lib/supabase/middleware.ts - mise à jour
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const updateSession = async (request: NextRequest) => {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  
  if (code) {
    return NextResponse.redirect(new URL(`/callback?code=${code}`, request.url));
  }

  return NextResponse.next({
    request: {
      headers: request.headers,
    },
  });
};