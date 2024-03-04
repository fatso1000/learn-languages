"use client";
import useSWR from "swr";
import Image from "next/image";
import {
  languagesAndTargets,
  languages,
  localesJSON,
} from "src/shared/helpers";
import { ChangeEvent, useState } from "react";
import { useTranslations } from "next-intl";

const fetcher = async () => {
  let languages: {
    target: string;
    base: string;
    baseUrl: string;
    targetUrl: string;
    id: number;
  }[] = languagesAndTargets.map(({ base, id, target }, i) => ({
    base,
    target,
    targetUrl: "",
    baseUrl: "",
    id,
  }));

  const getURL: any = (url: string) => {
    const importURL = import(`/public/images/flags/${url}_flag.png`);
    importURL
      .then((url: any) => url.default.src)
      .catch((error) => {
        console.error(error);
      });
    return importURL;
  };

  for (let i = 0; i < languages.length; i++) {
    const element = languages[i];
    const promise = await getURL(element.base);
    element.baseUrl = promise.default.src;
    const promise2 = await getURL(element.target);
    element.targetUrl = promise2.default.src;
  }

  return languages;
};

export default function LanguageInput(props: { defaultLanguage: string }) {
  const { defaultLanguage } = props;
  const [selectedLanguage, setSelectedLanguage] = useState(
    localesJSON[defaultLanguage].long
  );
  const t = useTranslations("pages.signUp");

  const { data, error, isLoading } = useSWR("/auth/user", fetcher);

  if (error) return <div>error</div>;
  if (isLoading) return "Loading...";

  const onLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(e.target.value);
  };

  return (
    <div className="form-control w-full">
      <label className="label p-0 px-4">
        <span className="label-text">
          Cursos de idiomas para hablantes de{" "}
          {localesJSON[defaultLanguage].long}
          <span className="label-text-alt text-[red]">*</span>
        </span>
      </label>
      <select
        className="select select-bordered w-full"
        name="type"
        required
        onChange={onLanguageChange}
      >
        <option disabled selected>
          I speak {localesJSON[defaultLanguage].long}
        </option>
        <option value={"all"}>All languages</option>
        {languages.map((type) => (
          <option value={type} key={type}>
            I speak {type}
          </option>
        ))}
      </select>
      <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-5 mt-3">
        {data &&
          data
            .filter((l) =>
              selectedLanguage === "all" ? true : l.base === selectedLanguage
            )
            .map((language, i) => (
              <>
                <input
                  required
                  name="language"
                  type="radio"
                  id={"language-" + language.id}
                  value={[language.base, language.target]}
                  className="radio hidden"
                ></input>
                <label
                  key={i}
                  htmlFor={"language-" + language.id}
                  className="flex h-20 relative items-center flex-col"
                >
                  <Image
                    src={language.targetUrl}
                    alt="flag"
                    width={96}
                    height={64}
                    className="m-auto h-16 w-24 rounded-md"
                  />
                  {selectedLanguage === "all" && (
                    <Image
                      src={language.baseUrl}
                      alt="flag"
                      width={63}
                      height={24}
                      className="m-auto h-9 w-12 rounded-md absolute top-0 right-0 shadow"
                    />
                  )}
                  {language.target}
                </label>
              </>
            ))}
      </div>
    </div>
  );
}
