"use client";
import Link from "next/link";
import {
  HomeSolidIcon,
  LogoutUserSolidIcon,
  SettingsSolidIcon,
  UserSolidBorderIcon,
} from "../Icons";
import { logoutUserFormAction } from "src/actions/auth";
import { usePathname } from "next/navigation";

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
}) =>
  isForm ? (
    <form className="h-full flex" action={logoutUserFormAction}>
      <button
        type="submit"
        className="inline-flex h-full !gap-2 items-center max-md:justify-center"
      >
        <LogoutUserSolidIcon stroke="#EB8014" />
        <span className="font-black text-lg max-lg:hidden">Logout</span>
      </button>
    </form>
  ) : (
    <Link
      href={href}
      className={`${
        pathname === href
          ? "pointer-events-none border-2 border-info bg-info/10 text-info "
          : ""
      } h-full inline-flex !gap-2 items-center max-md:justify-center active:bg-current`}
    >
      {icon}
      <span className="font-black text-lg max-lg:hidden">{span}</span>
    </Link>
  );

export default function LayoutComponent({
  isLoggedIn,
  children,
}: {
  isLoggedIn: boolean;
  children: any;
}) {
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
      <div className="drawer-content">{children}</div>
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
              span="Home"
              icon={<HomeSolidIcon fill={"#D13333"} />}
            />
          </li>
          <li className="h-14">
            <LinkButton
              href="/user/profile"
              span="Profile"
              pathname={pathname}
              icon={<UserSolidBorderIcon fill={"#4B0052"} />}
            />
          </li>
          <li className="h-14">
            <LinkButton
              href="/user/settings"
              span="Settings"
              pathname={pathname}
              icon={<SettingsSolidIcon fill={"#489380"} />}
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
