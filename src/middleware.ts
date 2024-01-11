import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const authRoutes = ["/auth/signin", "/auth/signup"];
const unauthRoutes = ["/", "/auth/signin", "/auth/signup"];

export async function middleware(req: NextRequest) {
  const current_user = req.cookies.get("current_user"),
    token = req.cookies.get("token");
  const pathname = req.nextUrl.pathname;

  const authHeader = req.headers.get("Authorization");

  if (current_user || token || authHeader) {
    if (pathname.includes("/auth")) {
      return NextResponse.redirect(new URL("/", req.nextUrl));
    }
    if (pathname.endsWith("/")) {
      return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
    }
  } else {
    if (pathname.includes("/user")) {
      return NextResponse.redirect(new URL("/", req.nextUrl));
    }
  }
  return NextResponse.next();
}
