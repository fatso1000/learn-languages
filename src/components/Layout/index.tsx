"use client";
import { Link } from "src/shared/navigation";
import {
  CourseIcon,
  HomeSolidIcon,
  LogoutUserSolidIcon,
  SettingsSolidIcon,
  UserSolidBorderIcon,
} from "../Icons";
import { logoutUserFormAction } from "src/actions/auth";
import { usePathname } from "next/navigation";

const BottomNavigationButton = ({
  href,
  icon,
  pathname,
}: {
  href: string;
  icon: JSX.Element;
  pathname: string | null;
}) => (
  <Link
    href={href}
    className={
      pathname === href || (pathname && href.includes(pathname))
        ? "text-info border-2 border-info bg-info/10 rounded-lg select-none"
        : "text-neutral-600 select-none"
    }
  >
    {icon}
  </Link>
);

const LinkButton = ({
  href,
  isForm,
  span,
  icon,
  pathname,
}: {
  href: string;
  span: string;
  icon: JSX.Element;
  isForm?: boolean;
  pathname: string | null;
}) => {
  /*   const t = useTranslations("generics");
   */ return isForm ? (
    <form className="h-full flex" action={logoutUserFormAction}>
      <button
        type="submit"
        className="inline-flex h-full !gap-2 items-center max-md:justify-center text-neutral-600"
      >
        <LogoutUserSolidIcon />
        <span className="font-black text-lg max-lg:hidden">{`t("logout")`}</span>
      </button>
    </form>
  ) : (
    <Link
      href={href}
      className={`${
        pathname === href || (pathname && href.includes(pathname))
          ? "pointer-events-none border-2 border-info bg-info/10 text-info "
          : "text-neutral-600 "
      } select-none h-full inline-flex !gap-2 items-center max-md:justify-center active:bg-current`}
    >
      {icon}
      <span className="font-black text-lg max-lg:hidden">{span}</span>
    </Link>
  );
};

export default function LayoutComponent({
  isLoggedIn,
  children,
}: {
  isLoggedIn: boolean;
  children: any;
}) {
  /* const t = useTranslations("generics"); */

  const pathname = usePathname();
  return (
    <div
      className={`mx-auto bg-base-100 drawer ${
        isLoggedIn && pathname !== "/level" ? "md:drawer-open" : ""
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
        {isLoggedIn && pathname !== "/level" && (
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
              span={`generics("home")`}
              icon={<HomeSolidIcon />}
            />
          </li>
          <li className="h-14">
            <LinkButton
              href="/user/profile"
              span={`generics("profile")`}
              pathname={pathname}
              icon={<UserSolidBorderIcon />}
            />
          </li>
          <li className="h-14">
            <LinkButton
              href="/user/settings"
              span={`generics("settings")`}
              pathname={pathname}
              icon={<SettingsSolidIcon />}
            />
          </li>
          <li className="h-14">
            <LinkButton
              href="/section?id=1"
              span={`generics("course")`}
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
              span=""
            />
          </li>
        </ul>
      </div>
    </div>
  );
}
