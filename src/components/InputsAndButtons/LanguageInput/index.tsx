import useSWR from "swr";
import Image from "next/image";
import { languagesList } from "src/shared/helpers";

const fetcher = async () => {
  let languages: { name: string; url: string; id: number }[] =
    languagesList.map((language, i) => ({
      name: language,
      url: "",
      id: i,
    }));

  const getURL: any = (url: string) => {
    const importURL = import(`/public/images/flags/${url}_flag.png`);
    importURL
      .then((url: any) => url.default.src)
      .catch((error) => {
        console.error(error);
        return "";
      });
    return importURL;
  };

  for (let i = 0; i < languages.length; i++) {
    const element = languages[i];
    const promise = await getURL(element.name);
    element.url = promise.default.src;
  }

  return languages;
};

export default function LanguageInput() {
  const { data, error, isLoading } = useSWR("", fetcher);

  if (error) return <div>error</div>;
  if (isLoading) return "Loading...";

  return (
    <div className="form-control w-full">
      <label className="label p-0 px-4">
        <span className="label-text">
          Language
          <span className="label-text-alt text-[red]">*</span>
        </span>
      </label>
      <div className="grid grid-cols-3 gap-2">
        {data &&
          data.map((language, i) => (
            <>
              <input
                required
                name="language"
                type="radio"
                id={"language-" + language.id}
                value={language.id}
                className="radio hidden"
              ></input>
              <label
                key={i}
                htmlFor={"language-" + language.id}
                className="flex h-20"
              >
                <Image
                  src={language.url}
                  alt="flag"
                  width={96}
                  height={64}
                  className="m-auto h-16 w-24 border-2 border-transparent"
                />
              </label>
            </>
          ))}
      </div>
    </div>
  );
}
