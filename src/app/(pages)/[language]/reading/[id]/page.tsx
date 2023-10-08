import ReadingList from "src/components/Reading";
import { Metadata } from "next";

export async function generateMetadata(props: any): Promise<Metadata> {
  return {
    title: "Search Blog By Name - Matias Benitez Blog",
    description: "",
  };
}



export default async function ReadingPageById({ params }: any) {
  const id = params.hasOwnProperty("id") ? params["id"] : "1";
//   const readingText = await 

  return (
    <main className="mt-4 px-4 sm:px-4 md:px-16">
      <header className="mb-4">
        <h1 className="text-2xl leading-6 font-black">Texts for begginers</h1>
        <p>lorem ipsum</p>
      </header>
      <section className="flex flex-col gap-y-5"></section>
    </main>
  );
}
