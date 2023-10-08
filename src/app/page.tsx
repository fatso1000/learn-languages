import { Metadata } from "next";
import HomeHeader from "src/components/HomeHeader";
import Modal from "src/components/Modal";

export async function generateMetadata(props: any): Promise<Metadata> {
  return {
    title: "Matias Benitez Blog",
    description: "",
  };
}

export default async function Home() {
  return (
    <main className="mt-4 px-4 sm:px-4 md:px-16">
      <HomeHeader />
      <section className="flex flex-col gap-y-5">
        <div>
          <h2>READING</h2>
          <p>lorem ipsum</p>
          <a className="link" href="/reading">
            Go to Reading
          </a>
        </div>
        <div></div>
      </section>
      <section></section>
    </main>
  );
}
