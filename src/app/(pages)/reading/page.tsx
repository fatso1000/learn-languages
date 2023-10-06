import ReadingList from "src/components/Reading";
import { Metadata } from "next";

export async function generateMetadata(props: any): Promise<Metadata> {
  return {
    title: "Search Blog By Name - Matias Benitez Blog",
    description: "",
  };
}

export default async function ReadingsPage(props: any) {
  return (
    <main className="mt-4">
      {/* <header className="mb-4">
        <SearchInput defaultValue={name} />
      </header> */}
      <section className="flex flex-col gap-y-5">
        <ReadingList />
      </section>
      {/* <section className="flex flex-col gap-y-5">
        {!blogs.error && blogs.data && blogs.data.length > 0 ? (
          <BlogsList blogs={blogs.data} />
        ) : (
          <span className="absolute text-lg flex flex-col items-center m-auto top-1/2 left-1/2 -translate-x-20">
            <p className="font-bold">No records found</p>
            <Link
              href="/"
              className="text-stone-500  items-center gap-x-1 inline-flex hover:underline transition"
            >
              Go Home <AiOutlineArrowRight width={8} height={8} />
            </Link>
          </span>
        )}
      </section> */}
    </main>
  );
}
