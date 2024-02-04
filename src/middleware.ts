import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { languagesList } from "./shared/helpers";

const authRoutes = ["/user/"];
const unauthRoutes = ["/"];

export async function middleware(req: NextRequest) {
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-pathname", req.nextUrl.pathname);

  const current_user = req.cookies.get("current_user"),
    token = req.cookies.get("token"),
    authHeader = req.headers.get("Authorization");
  const pathname = req.nextUrl.pathname;

  if (!token && current_user) {
    if (
      ["/languages", "/user", "/dashboard"].includes(pathname) ||
      languagesList.includes(pathname)
    ) {
      return NextResponse.redirect(new URL("/", req.nextUrl));
    }
  }

  if ((current_user && token) || authHeader) {
    if (pathname.includes("/auth")) {
      return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
    }
    if (pathname.endsWith("/")) {
      return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
    }
  } else {
    if (pathname.includes("/user")) {
      return NextResponse.redirect(new URL("/", req.nextUrl));
    }
    if (pathname.includes("/dashboard")) {
      return NextResponse.redirect(new URL("/", req.nextUrl));
    }
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}
