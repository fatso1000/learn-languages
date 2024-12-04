import { logoutUserFormAction } from "src/actions/auth";
import { LogoutUserSolidIcon } from "src/components/Icons";
import { Link } from "src/shared/navigation";
import type { JSX } from "react";

export default function LinkButton({
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
}) {
  return isForm ? (
    <form className="h-full flex" action={logoutUserFormAction}>
      <button
        type="submit"
        className="inline-flex h-full !gap-2 items-center max-md:justify-center text-neutral-600"
      >
        <LogoutUserSolidIcon />
        <span className="font-black text-lg max-lg:hidden">{span}</span>
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
}
