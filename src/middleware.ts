import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getBrowserLanguage, languagesList, locales } from "./shared/helpers";
import createMiddleware from "next-intl/middleware";
import { localePrefix } from "./shared/navigation";

const authRoutes = ["/user/"];
const publicPages = ["/auth"];
const unauthRoutes = ["/languages", "/user", "/dashboard", "/profile"];

export async function middleware(req: NextRequest) {
  let [, locale, ...segments] = req.nextUrl.pathname.split("/");
  const defaultLanguage = getBrowserLanguage(req) || "en",
    current_user = req.cookies.get("current_user"),
    token = req.cookies.get("token"),
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
    const isUnauthLanguagesRoute = languagesList.find((route) =>
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
        .short_name;
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

  const handleI18nRouting = createMiddleware({
    locales,
    defaultLocale: defaultLanguage,
    localePrefix,
  });
  const response = handleI18nRouting(req);

  return response;
}

export const config = {
  matcher: ["/", "/(es|en|jp)/:path*"],
};
