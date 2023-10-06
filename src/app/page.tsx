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
      <section className="flex flex-col gap-y-5"></section>
    </main>
  );
}
