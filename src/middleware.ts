import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const accessToken = request.cookies.get("UserToken");
  if (!accessToken && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }
  // Redirect authenticated users trying to access auth routes
  if (accessToken && request.nextUrl.pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/dashboard/settings", request.url));
  }
  // const accessToken
  return response;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/dashboard/:path*", // Protect the /dashboard route and its sub-routes
    "/auth/:path*", // Check access to /signin
  ],
};
