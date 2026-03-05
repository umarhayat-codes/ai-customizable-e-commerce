import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define route categories
const authRoutes = ["/auth/signin", "/auth/signup"];

// Helper function to check if path matches auth routes
function isAuthRoute(pathname: string): boolean {
  // Remove trailing slash for consistent comparison
  const normalizedPath =
    pathname.endsWith("/") && pathname !== "/"
      ? pathname.slice(0, -1)
      : pathname;

  return authRoutes.some(
    (route) =>
      normalizedPath === route || normalizedPath.startsWith(route + "/"),
  );
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if user has auth_status cookie (set by frontend after login)
  const authCookie = request.cookies.get("auth_status");
  const isAuthenticated = authCookie?.value === "authenticated";

  console.log("🛡️ Middleware:", pathname);
  console.log(
    "🍪 All Cookies:",
    request.cookies
      .getAll()
      .map((c) => `${c.name}=${c.value ? "present" : "empty"}`)
      .join(", ") || "none",
  );
  console.log(
    "🔑 Auth Status:",
    isAuthenticated,
    authCookie?.value || "no cookie",
  );

  // Check if this is an auth route
  const isAuthPath = isAuthRoute(pathname);
  console.log("📍 Is Auth Route:", isAuthPath);

  // If user is authenticated and trying to access auth pages, redirect to home
  if (isAuthenticated && isAuthPath) {
    console.log("🔒 Redirecting authenticated user from", pathname, "to /");
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If user is NOT authenticated and trying to access protected routes
  // Note: We allow "/" temporarily ONLY if the auth_callback=true query is present (returning from OAuth)
  const isAuthCallback =
    request.nextUrl.searchParams.get("auth_callback") === "true";

  if (!isAuthenticated && !isAuthPath) {
    if (pathname === "/" && isAuthCallback) {
      console.log("🔓 Allowing temporary access to / for OAuth sync");
      return NextResponse.next();
    }

    console.log(
      "🚫 Redirecting unauthenticated user from",
      pathname,
      "to /auth/signin",
    );
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  return NextResponse.next();
}

// Configure which routes should run this middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
