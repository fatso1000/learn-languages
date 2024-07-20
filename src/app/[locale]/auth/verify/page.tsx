import { getTranslations } from "next-intl/server";
import Navbar from "src/components/Navbar";

export default async function Verify() {
  const t = await getTranslations("pages.verify");
  return (
    <>
      <Navbar />
      <div>
        <main className="mt-4 px-4 sm:px-4 md:px-16">
          <section className="flex flex-col gap-y-5 m-auto bg-base-200 w-1/2 p-6 border-4 border-base-300 rounded-xl items-center">
            <h1 className="font-black text-3xl text-center">{t("title")}</h1>
            <h2 className="font-bold text-xl text-center">{t("subtitle")}</h2>
          </section>
        </main>
      </div>
    </>
  );
}
