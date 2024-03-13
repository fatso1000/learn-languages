import { locales, localesJSON } from "src/shared/helpers";
import { getLocale, getTranslations } from "next-intl/server";
import languagesList from "src/shared/languagesList";
import Image from "next/image";
import Link from "next/link";

export default async function LocaleSelect({ pathname }: { pathname: string }) {
  const currentLocale = await getLocale();
  const generics = await getTranslations("generics");

  return (
    <div className="dropdown dropdown-end md:w-48">
      <div
        tabIndex={0}
        role="button"
        className="select bg-base-200 flex items-center gap-2"
      >
        <Image
          src={languagesList[localesJSON[currentLocale].long].flagUrl.src}
          alt=""
          width={48}
          height={28}
          className="w-10 my-auto rounded-md"
        />
        <span className="capitalize max-sm:hidden">
          {generics(`languages.${localesJSON[currentLocale].long}`)}
        </span>
      </div>
      <div
        tabIndex={0}
        className="dropdown-content z-[1] menu shadow bg-base-100 rounded-xl w-full gap-2 p-4"
      >
        {locales.map(
          (locale, i) =>
            locale !== currentLocale && (
              <Link
                key={i}
                className="btn btn-ghost p-0 flex md:justify-start md:pl-2"
                href={"/" + locale + pathname.slice(3)}
              >
                <Image
                  src={languagesList[localesJSON[locale].long].flagUrl.src}
                  alt=""
                  width={48}
                  height={28}
                  className="w-12 h-8 rounded-md"
                />
                <span className="capitalize max-sm:hidden">
                  {generics(`languages.${localesJSON[locale].long}`)}
                </span>
              </Link>
            )
        )}
      </div>
    </div>
  );
}
