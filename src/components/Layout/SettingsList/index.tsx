"use client";
import { Link, usePathname } from "src/shared/navigation";

export default function SettingsList(props: any) {
  const { locale } = props;
  const pathname = usePathname();

  return (
    <ul className="flex flex-col gap-2">
      {["account", "password", "courses"].map((value) => {
        const isDisabled =
          `/${locale}/user/settings${
            value !== "account" ? "/" + value : ""
          }` === `/${locale}${pathname}`;
        return (
          <Link
            key={value}
            href={`/user/settings/${value !== "account" ? value : ""}`}
            className={`font-extrabold p-3 btn w-full justify-start ${
              isDisabled ? "" : "btn-ghost"
            }`}
            aria-disabled={isDisabled}
          >
            {value}
          </Link>
        );
      })}
    </ul>
  );
}
