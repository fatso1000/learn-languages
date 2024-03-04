import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getBrowserLanguage, languages, locales } from "./shared/helpers";
import createMiddleware from "next-intl/middleware";
import { localePrefix } from "./shared/navigation";
import { ILives } from "./types";

const authRoutes = ["/user/"];
const publicPages = ["/auth"];
const unauthRoutes = ["/languages", "/user", "/dashboard", "/profile"];

export async function middleware(req: NextRequest) {
  let [, locale, ...segments] = req.nextUrl.pathname.split("/");
  const defaultLanguage = getBrowserLanguage(req) || "en",
    current_user = req.cookies.get("current_user"),
    token = req.cookies.get("token"),
    lives = req.cookies.get("lives"),
    authHeader = req.headers.get("Authorization"),
    pathname = req.nextUrl.pathname,
    selected_language = req.cookies.get("selected_language");

  if (
    !token ||
    !current_user ||
    token.value === "" ||
    current_user.value === ""
  ) {
    const isUnauthRoute = unauthRoutes.find((route) =>
      pathname.includes(route)
    );
    const isUnauthLanguagesRoute = languages.find((route) =>
      pathname.includes(route)
    );
    if (!!isUnauthRoute || !!isUnauthLanguagesRoute) {
      req.nextUrl.pathname = `/${locale}`;
      return NextResponse.redirect(req.nextUrl);
    }
  }

  if ((current_user && token) || authHeader) {
    const isHome = locales.find(
      (locale) =>
        pathname.endsWith("/" + locale) || pathname.endsWith("/" + locale + "/")
    );
    if (selected_language && selected_language.value !== "") {
      const userSelectedLocale = JSON.parse(selected_language.value).details
        .base_language.short_name;
      if (userSelectedLocale !== locale) {
        locale = userSelectedLocale;
        req.nextUrl.pathname = `/${locale}/${req.nextUrl.pathname.slice(4)}`;
        return NextResponse.redirect(req.nextUrl);
      }
      if (pathname.includes("/auth") || isHome) {
        req.nextUrl.pathname = `/${locale}/dashboard`;
        return NextResponse.redirect(req.nextUrl);
      }
    }
  } else {
    if (pathname.includes("/user") || pathname.includes("/dashboard")) {
      req.nextUrl.pathname = `/${locale}`;
      return NextResponse.redirect(req.nextUrl);
    }
  }

  // CATCH ENTERING LEVEL WITHOUT LIVES
  if (pathname.includes("level")) {
    const section_id = req.nextUrl.searchParams.get("section_id");

    if (lives && lives.value) {
      const livesObj = JSON.parse(lives.value) as ILives;
      if (livesObj.lives === 0) {
        if (section_id) req.nextUrl.searchParams.set("id", section_id);
        req.nextUrl.pathname = section_id ? `/${locale}/section` : `/${locale}`;

        return NextResponse.redirect(req.nextUrl);
      }
    } else if (!lives || !lives.value) {
      if (section_id) req.nextUrl.searchParams.set("id", section_id);
      req.nextUrl.pathname = section_id ? `/${locale}/section` : `/${locale}`;

      return NextResponse.redirect(req.nextUrl);
    }
  }

  const handleI18nRouting = createMiddleware({
    locales,
    defaultLocale: defaultLanguage,
    localePrefix,
  });
  const response = handleI18nRouting(req);

  response.headers.set("x-url", req.nextUrl.pathname);

  return response;
}

export const config = {
  matcher: ["/", "/(es|en|jp)/:path*"],
};
