import { ILives, IStrikes, IUser, SelectedLanguageElement } from "src/types";
import LanguageSelect from "../InputsAndButtons/LanguageSelect";
import { cookies, headers } from "next/headers";
import HeartDropdown from "./HeartDropdown";
import StrikeDropdown from "./StrikeDropdown";
import { getTranslations } from "next-intl/server";
import { Link } from "src/shared/navigation";
import { levelAuthRegex } from "src/shared/helpers";

export default async function Navbar(props: any) {
  const t = await getTranslations("generics");

  const cookieStore = cookies();
  const cookiesObj = {
    current_user: cookieStore.get("current_user"),
    token: cookieStore.get("token"),
    selectedLanguage: cookieStore.get("selected_language"),
    lives: cookieStore.get("lives"),
    strikes: cookieStore.get("strikes"),
  };

  const currentUser: IUser | undefined =
      cookiesObj.current_user && cookiesObj.current_user.value !== ""
        ? JSON.parse(cookiesObj.current_user.value)
        : undefined,
    selectedLanguage: SelectedLanguageElement | undefined =
      cookiesObj.selectedLanguage && cookiesObj.selectedLanguage.value !== ""
        ? JSON.parse(cookiesObj.selectedLanguage.value)
        : undefined,
    token =
      cookiesObj.token && cookiesObj.token.value !== ""
        ? cookiesObj.token.value
        : undefined,
    lives: ILives | undefined =
      cookiesObj.lives && cookiesObj.lives.value !== ""
        ? JSON.parse(cookiesObj.lives.value)
        : undefined,
    strikes: IStrikes | undefined =
      cookiesObj.strikes && cookiesObj.strikes.value !== ""
        ? JSON.parse(cookiesObj.strikes.value)
        : undefined;

  const headersList = headers(),
    pathname = headersList.get("x-url") || "";

  const isLoggedIn = currentUser && token ? true : false;

  return (
    <nav className="navbar bg-base-100 px-4 md:px-8 mt-2 bg-opacity-90 text-base-content h-16 backdrop-blur transition-all duration-100 shadow-sm">
      <div className="flex-1">
        <Link
          className="btn btn-ghost leading-none normal-case text-xl font-extrabold"
          href="/"
        >
          <span className="text-success">L</span>
          <span className="text-info">L</span>
          <span className="text-secondary">O</span>
        </Link>
      </div>

      <div className="flex-none">
        {isLoggedIn &&
        currentUser &&
        selectedLanguage &&
        !levelAuthRegex.test(pathname) ? (
          <>
            <LanguageSelect
              selectedLanguage={selectedLanguage}
              languages={currentUser.profile.languages}
            />
            <HeartDropdown userId={currentUser.id} lives={lives} />
            <StrikeDropdown userId={currentUser.id} strikes={strikes} />
          </>
        ) : (
          <>
            <div>
              <Link className="btn btn-success normal-case" href="/auth/signup">
                {t("signUp")}
              </Link>
            </div>
            <div className="ml-4">
              <Link className="btn normal-case" href="/auth/signin">
                {t("signIn")}
              </Link>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}
