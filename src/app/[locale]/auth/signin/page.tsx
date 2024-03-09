import Image from "next/image";
import { Link } from "src/shared/navigation";
import SignInForm from "src/components/Form/SignInForm";
import Navbar from "src/components/Navbar";
import { getTranslations } from "next-intl/server";

export default async function SignIn() {
  const generics = await getTranslations("generics");
  const t = await getTranslations("pages.signIn");

  return (
    <>
      <Navbar />
      <div>
        <main className="my-4 px-4 sm:px-4 md:px-16">
          <section className="flex flex-col gap-y-5 max-w-[50ch] m-auto md:border-2 md:p-7 md:rounded-md">
            <h1 className="font-black text-6xl text-center">{t("title")}</h1>
            <Image
              src="https://www.katywang.co.uk/img/misc/stickers/chameleons-boil-500px.gif"
              alt=""
              width={20}
              height={20}
              className="w-2/4 h-auto mx-auto"
            />
            <SignInForm />
            <div>
              <Link
                href="/forgot"
                className="link link-info items-center justify-center flex"
              >
                {t("forgotPassword")}
              </Link>
              <div className="divider" />
              <Link href="/auth/signup" className="btn w-full">
                {generics("signUp")}
              </Link>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
