import { Link } from "src/shared/navigation";
import Navbar from "src/components/Navbar";
import { authorizeUser } from "src/queryFn";
import { getTranslations } from "next-intl/server";

export default async function Verified({
  searchParams,
}: {
  searchParams: { token: string };
}) {
  const t = await getTranslations("pages.verify");
  const generics = await getTranslations("generics");

  const decodedToken = atob(searchParams.token);

  await authorizeUser({ token: decodedToken });

  return (
    <>
      <Navbar />
      <div>
        <main className="mt-4 px-4 sm:px-4 md:px-16">
          <section className="flex flex-col gap-y-5 m-auto bg-base-200 w-1/2 p-6 border-4 border-base-300 rounded-xl items-center">
            <h1 className="font-black text-3xl text-center">{t("title")}</h1>
            <h2 className="font-bold text-xl text-center">{t("subtitle")}</h2>
            <Link
              className="btn btn-primary w-1/4 text-base font-bold"
              href="/auth/signin"
            >
              {generics("signIn")}
            </Link>
          </section>
        </main>
      </div>
    </>
  );
}
