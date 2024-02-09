import Link from "next/link";
import { IUser, SelectedLanguageElement } from "src/types";
import LanguageSelect from "../InputsAndButtons/LanguageSelect";
import { cookies } from "next/headers";
import { FireIconSolid, HeartIconSolid } from "../Icons";

export default async function Navbar(props: any) {
  const cookieStore = cookies();
  const cookiesObj = {
    current_user: cookieStore.get("current_user"),
    token: cookieStore.get("token"),
    selectedLanguage: cookieStore.get("selected_language"),
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
        : undefined;

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
        {isLoggedIn && currentUser && selectedLanguage ? (
          <>
            <LanguageSelect
              selectedLanguage={selectedLanguage}
              languages={currentUser.profile.languages}
            />
            <div className="btn max-md:btn-sm btn-ghost flex justify-center items-center gap-1">
              <HeartIconSolid fill="#F87272" className="w-6 h-6" />
              <span className="font-extrabold text-lg">5</span>
            </div>

            <div className="btn max-md:btn-sm btn-ghost flex justify-center items-center gap-1">
              <FireIconSolid />
              <span className="font-extrabold text-lg">5</span>
            </div>
          </>
        ) : (
          <>
            <div>
              <Link className="btn btn-success normal-case" href="/auth/signup">
                Sign Up
              </Link>
            </div>
            <div className="ml-4">
              <Link className="btn normal-case" href="/auth/signin">
                Log In
              </Link>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}
