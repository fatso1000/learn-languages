import ListeningList from "src/components/Listening";
import { IUser, Languages } from "src/types";
import { getContentByLanguageAndType } from "src/queryFn";
import Navbar from "src/components/Navbar";
import { cookies } from "next/headers";
import { getTranslations } from "next-intl/server";
import ErrorComponent from "src/components/Error";

const languageslist = [
  Languages.english,
  Languages.french,
  Languages.spanish,
  Languages.german,
  Languages.japanese,
];

export default async function ReadingsPage({
  params,
}: {
  params: { language?: Languages };
}) {
  const generics = await getTranslations("generics");
  const t = await getTranslations("pages.reading");

  const language = params.hasOwnProperty("language")
    ? params["language"]
    : undefined;

  const cookieStore = cookies();
  const current_user = cookieStore.get("current_user");

  const currentUser: IUser | undefined =
    current_user && current_user.value !== ""
      ? JSON.parse(current_user.value)
      : undefined;

  if (!language || !languageslist.includes(language)) return <ErrorComponent />;

  const listenings = await getContentByLanguageAndType(language, "Listening");
  if (!listenings.data || listenings.errors.length > 0)
    return <ErrorComponent />;

  console.log(listenings);

  return (
    <>
      <Navbar />
      <main className="mt-4 px-4 sm:px-4 md:px-16">
        <header className="mb-4">
          <h1 className="text-4xl text-success font-black first-letter:uppercase">
            {t("title", {
              language: generics(
                `languages.${language.toLowerCase()}`
              ).toLowerCase(),
            })}
          </h1>
          <p className="font-semibold text-neutral-500">
            {t("subtitle", {
              language: generics(
                `languages.${language.toLowerCase()}`
              ).toLowerCase(),
            })}
          </p>
        </header>
        <section className="flex flex-col gap-y-5">
          <ListeningList values={listenings.data} userId={currentUser?.id} />
        </section>
      </main>
    </>
  );
}
