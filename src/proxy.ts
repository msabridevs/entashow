import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// FIX: Renamed 'middleware' to 'proxy' to match Next.js 16 requirements
export function proxy(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const url = request.nextUrl.clone();

  // ✅ Do not interfere with auth callback
  if (url.pathname.startsWith("/auth/callback")) {
    return NextResponse.next();
  }

  // ✅ Redirect any *.vercel.app URL to your real domain
  if (host.endsWith(".vercel.app")) {
    url.hostname = "entashow.com";
    url.protocol = "https:";
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|css|js)).*)",
  ],
};
