import { getTranslations } from "next-intl/server";
import Image from "next/image";
import SignUpForm from "src/components/Form/SignUpForm";
import Navbar from "src/components/Navbar";

export default async function SignUp() {
  const t = await getTranslations("pages.signUp");
  return (
    <>
      <Navbar />
      <div>
        <main className="mt-4 px-4 sm:px-4 md:px-16">
          <section className="flex flex-col gap-y-5 max-w-[50ch] m-auto md:border-2 md:p-7 md:rounded-md">
            <h1 className="font-black text-6xl text-center">{t("title")}</h1>
            <Image
              src="https://www.katywang.co.uk/img/misc/stickers/otter.gif"
              alt=""
              width={20}
              height={20}
              className="w-2/4 h-auto mx-auto"
            />
            <SignUpForm />
          </section>
        </main>
      </div>
    </>
  );
}
