import { Metadata } from "next";
import { Languages } from "src/types";
import { Link } from "src/shared/navigation";
import ErrorComponent from "src/components/Error";

export async function generateMetadata(props: any): Promise<Metadata> {
  return {
    title: "Reading Language Select",
    description: "",
  };
}

const languageslist = [
  Languages.english,
  Languages.french,
  Languages.spanish,
  Languages.german,
  Languages.japanese,
];

export default async function ReadingsPage({ params }: any) {
  const language = params.hasOwnProperty("language")
    ? params["language"]
    : undefined;

  if (!language || !languageslist.includes(language)) return <ErrorComponent />;

  return (
    <main className="mt-4 px-4 sm:px-4 md:px-16">
      <header className="mb-4">
        <h1 className="text-2xl leading-6 font-black first-letter:uppercase">
          {language} content for begginers
        </h1>
        <p>
          This are some of the best text to learn and practice {language} online
          and for free.
        </p>
      </header>
      <section className="flex flex-col">
        <h2 className="text-xl font-bold">Readings</h2>
        <p className="mb-4">
          Lorem ipsum
          <Link href={`/${language}/reading`} className="link block">
            Go to Readings!
          </Link>
        </p>
      </section>
      <section className="flex flex-col">
        <h2 className="text-xl font-bold">Listenings</h2>
        <p className="mb-4">
          Lorem ipsum
          <Link href={`/${language}/listening`} className="link block">
            Go to Listenings!
          </Link>
        </p>
      </section>
    </main>
  );
}
