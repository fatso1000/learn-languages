import { IFlags, Languages } from "src/types";

import ukFlag from "public/images/flags/english_flag.png";
import spainFlag from "public/images/flags/spanish_flag.png";
import franceFlag from "public/images/flags/french_flag.png";
import italianFlag from "public/images/flags/italian_flag.png";
import germanFlag from "public/images/flags/german_flag.png";
import japaneseFlag from "public/images/flags/japanese_flag.png";

import Link from "next/link";

const flags: IFlags[] = [
  {
    language: Languages.english,
    flagUrl: ukFlag,
    displayName: "English",
  },
  {
    language: Languages.spanish,
    flagUrl: spainFlag,
    displayName: "Spanish",
  },
  { language: Languages.german, flagUrl: germanFlag, displayName: "German" },
  { language: Languages.italian, flagUrl: italianFlag, displayName: "Italian" },
  {
    language: Languages.japanese,
    flagUrl: japaneseFlag,
    displayName: "Japanese",
  },
  { language: Languages.french, flagUrl: franceFlag, displayName: "French" },
];

export default async function UserProfile() {
  return (
    <main className="mt-4 px-4 sm:px-4 md:px-16">
      <div className="mb-4 min-h-[100vh] overflow-hidden pb-40 pt-32">
        <div className="relative">
          <div className="relative mx-auto flex items-center flex-col">
            <h1 className="text-6xl leading-6 font-black text-center inline-flex items-center">
              Languages Selection
            </h1>
            <div className="inline-flex flex-wrap w-full gap-3 mb-4 overflow-hidden pb-40 pt-24">
              {flags.map((flag) => {
                return (
                  <Link
                    href={`${flag.language}/reading`}
                    key={flag.language}
                    className="inline-flex w-[49%] h-40 hover:brightness-95 relative mx-auto items-center justify-start"
                  >
                    <div data-tip={flag.displayName} className="tooltip w-full">
                      <img
                        src={flag.flagUrl.src}
                        alt={""}
                        className="w-full h-40"
                      />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
