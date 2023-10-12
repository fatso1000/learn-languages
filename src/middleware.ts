import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const authRoutes = ["/auth/signin", "/auth/signup"];
const unauthRoutes = ["/", "/auth/login", "/auth/signup"];

export async function middleware(request: NextRequest) {
  const current_user = request.cookies.get("current_user"),
    token = request.cookies.get("token");
  const pathname = request.nextUrl.pathname;

  if (current_user || token) {
    if (pathname.startsWith("/auth")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else {
    if (pathname.startsWith("/user")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}
