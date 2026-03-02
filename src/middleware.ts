import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ALLOWED = new Set([
  "/coming-soon",
]);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Pass through: ALLOWED, Next.js internals, and static files
  if (
    ALLOWED.has(pathname) ||
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/api/") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Always redirect root and everything else to coming-soon

  const url = request.nextUrl.clone();
  url.pathname = "/coming-soon";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/", "/((?!_next/static|_next/image|favicon.ico).*)"],
};
