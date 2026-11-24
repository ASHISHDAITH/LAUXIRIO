import { NextResponse, type NextRequest } from "next/server";

const publicPages = new Set([
  "/",
  "/about",
  "/services",
  "/gallery",
  "/artists",
  "/experience",
  "/booking",
  "/contact",
  "/journal",
  "/privacy",
  "/admin",
  "/robots.txt",
  "/sitemap.xml",
  "/_not-found",
]);

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (
    publicPages.has(pathname.replace(/\/+$/, "") || "/") ||
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    /\.(?:avif|gif|ico|jpe?g|mp4|otf|png|svg|ttf|webm|webp|woff2?)$/i.test(pathname)
  ) {
    return NextResponse.next();
  }

  return NextResponse.rewrite(new URL("/_not-found", request.url), { status: 404 });
}

export const config = {
  matcher: ["/:path*"],
};
