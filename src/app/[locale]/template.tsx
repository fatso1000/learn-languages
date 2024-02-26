import { getTranslations } from "next-intl/server";
import { cookies, headers } from "next/headers";
import {
  CourseIcon,
  HomeSolidIcon,
  SettingsSolidIcon,
  UserSolidBorderIcon,
} from "src/components/Icons";
import { BottomNavigationButton, LinkButton } from "src/components/Layout";
import { levelAuthRegex } from "src/shared/helpers";
import { IUser } from "src/types";

export default async function Template({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies(),
    cookiesObj = {
      current_user: cookieStore.get("current_user"),
      token: cookieStore.get("token"),
      selectedLanguage: cookieStore.get("selected_language"),
    };

  const currentUser: IUser | undefined =
      cookiesObj.current_user && cookiesObj.current_user.value !== ""
        ? JSON.parse(cookiesObj.current_user.value)
        : undefined,
    token =
      cookiesObj.token && cookiesObj.token.value !== ""
        ? cookiesObj.token.value
        : undefined;

  const isLoggedIn = currentUser && token ? true : false;
  const t = await getTranslations("generics"),
    headersList = headers(),
    pathname = headersList.get("x-url") || "";

  return (
    <div
      className={`mx-auto bg-base-100 drawer ${
        isLoggedIn && !levelAuthRegex.test(pathname) ? "md:drawer-open" : ""
      } drawer-end`}
    >
      <input
        id="drawer"
        type="checkbox"
        disabled
        className="drawer-toggle"
      ></input>
      <div className="drawer-content">
        {children}
        {isLoggedIn && !levelAuthRegex.test(pathname) && (
          <>
            <div className="md:hidden h-1 w-0 mt-14"></div>
            <div className="md:hidden btm-nav border-t-2 z-50">
              <BottomNavigationButton
                href="/dashboard"
                pathname={pathname}
                icon={<HomeSolidIcon />}
              />
              <BottomNavigationButton
                href="/user/profile"
                pathname={pathname}
                icon={<UserSolidBorderIcon />}
              />
              <BottomNavigationButton
                href="/section?id=1"
                pathname={pathname}
                icon={<CourseIcon />}
              />
              <BottomNavigationButton
                href="/user/settings"
                pathname={pathname}
                icon={<SettingsSolidIcon />}
              />
              <LinkButton
                pathname={pathname}
                isForm={true}
                href=""
                icon={<></>}
                span=""
              />
            </div>
          </>
        )}
      </div>
      <div className="drawer-side z-40">
        <label
          htmlFor="drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 lg:w-56 md:w-24 min-h-full border-2 border-y-0 border-r-0 text-base-content">
          <li className="h-14">
            <LinkButton
              href="/dashboard"
              pathname={pathname}
              span={t("home")}
              icon={<HomeSolidIcon />}
            />
          </li>
          <li className="h-14">
            <LinkButton
              href="/user/profile"
              span={t("profile")}
              pathname={pathname}
              icon={<UserSolidBorderIcon />}
            />
          </li>
          <li className="h-14">
            <LinkButton
              href="/user/settings"
              span={t("settings")}
              pathname={pathname}
              icon={<SettingsSolidIcon />}
            />
          </li>
          <li className="h-14">
            <LinkButton
              href="/section?id=1"
              span={t("course")}
              pathname={pathname}
              icon={<CourseIcon />}
            />
          </li>
          <li className="h-14">
            <LinkButton
              pathname={pathname}
              isForm={true}
              href=""
              icon={<></>}
              span={t("logout")}
            />
          </li>
        </ul>
      </div>
    </div>
  );
}
