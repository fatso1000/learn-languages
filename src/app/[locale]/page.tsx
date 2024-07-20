import Image from "next/image";
import HomeHeader from "src/components/HomeHeader";
import Navbar from "src/components/Navbar";
import { getTranslations } from "next-intl/server";
import { Link } from "src/shared/navigation";

export default async function Home(props: any) {
  const generics = await getTranslations("generics");
  const t = await getTranslations("pages.unauthDashboard");

  return (
    <>
      <Navbar props={props} />
      <main>
        <div className="m-auto">
          <header className="h-[calc(100svh-68px)] px-4 border-b-2 m-auto overflow-hidden flex justify-center flex-col">
            <HomeHeader subtitle={t("sectionOne.subtitle")} />
          </header>
          <section className="flex flex-col gap-52">
            <section className="max-w-[1182px] px-4 m-auto mt-32 overflow-hidden flex justify-center flex-col">
              <div className="relative flex items-center justify-center flex-col-reverse gap-7 md:flex-row">
                <div className="md:w-2/5">
                  <h2 className="font-light text-5xl leading-none">
                    <span className="font-black text-success">
                      {t("sectionTwo.title.fast")}
                    </span>{" "}
                    {t("sectionTwo.title.and")}{" "}
                    <span className="font-black text-info">
                      {t("sectionTwo.title.free")}
                    </span>{" "}
                    :)
                  </h2>
                  <p className="mt-4 text-xl text-base/60 font-light">
                    {t("sectionTwo.subtitle")}
                  </p>
                </div>
                <div className="md:flex md:w-2/5">
                  <div className="group hover w-full h-full flex flex-col justify-center">
                    <Image
                      src="https://www.katywang.co.uk/img/misc/stickers/wolf1103.gif"
                      alt=""
                      width={80}
                      height={80}
                      className="w-full mask mask-heart bg-gradient-to-r from-accent to-accent"
                    />
                    <span className="group-hover:visible invisible m-auto italic text-success font-light">
                      Gif by Katy Wang
                    </span>
                  </div>
                </div>
              </div>
            </section>
            <section className="max-w-[1182px] px-4 m-auto overflow-hidden flex justify-center flex-col">
              <div className="relative flex items-center justify-center flex-col-reverse gap-7 md:flex-row-reverse">
                <div className="md:w-2/5">
                  <h2 className="font-light text-5xl leading-none">
                    <span className="font-black text-success">
                      {t("sectionThree.title.feel")}
                    </span>{" "}
                    <span className="font-black text-accent">
                      {t("sectionThree.title.free")}
                    </span>
                  </h2>
                  <p className="mt-4 text-xl text-base/60 font-light">
                    {t("sectionThree.subtitle")}
                  </p>
                </div>
                <div className="md:flex md:w-2/5">
                  <div className="group hover w-full h-full flex flex-col justify-center">
                    <Image
                      src="https://www.katywang.co.uk/img/misc/stickers/ballerina-boil.gif"
                      alt=""
                      width={80}
                      height={80}
                      className="w-full mask mask-hexagon bg-gradient-to-r from-success to-success"
                    />
                    <span className="group-hover:visible invisible m-auto italic text-success font-light">
                      Gif by Katy Wang
                    </span>
                  </div>
                </div>
              </div>
            </section>
            <section className="w-full bg-success m-auto overflow-hidden flex justify-center flex-col rounded-t-2xl">
              <div className="max-w-[1300px] relative flex items-center m-auto justify-between gap-7 my-7 flex-col-reverse">
                <div className="md:flex-1">
                  <Link
                    className="btn bg-success-content text-success hover:bg-success-content/80 md:btn-wide px-12 normal-case text-xl"
                    href="/auth/signup"
                  >
                    {generics("startToday")}
                  </Link>
                </div>
                <div className="md:flex md:w-2/4">
                  <Image
                    src="https://www.katywang.co.uk/img/misc/stickers/hare.gif"
                    alt=""
                    width={80}
                    height={80}
                    className="w-full"
                  />
                </div>
              </div>
            </section>
          </section>
          <footer className="w-full bg-success py-24">
            <div className="max-w-[70ch] mx-auto grid gap-7 px-6 md:px-0 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
              <div>
                <div>
                  <h3 className="font-black text-success-content text-lg">
                    {t("footer.about.title")}
                  </h3>
                </div>
                <div className="text-success-content/70 font-bold">
                  <ul className="flex flex-col gap-1">
                    <li>
                      <Link href="/team">{t("footer.about.label.team")}</Link>
                    </li>
                    <li>
                      <Link href="/purpose">
                        {t("footer.about.label.purpose")}
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div>
                <div>
                  <h3 className="font-black text-success-content text-lg">
                    {t("footer.helpAndSupport.title")}
                  </h3>
                </div>
                <div className="text-success-content/70 font-bold">
                  <ul className="flex flex-col gap-1">
                    <li>
                      <Link href="/faq">
                        {t("footer.helpAndSupport.label.faq")}
                      </Link>
                    </li>
                    <li>
                      <Link href="/contact">
                        {t("footer.helpAndSupport.label.contactUs")}
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div>
                <div>
                  <h3 className="font-black text-success-content text-lg">
                    {t("footer.social.title")}
                  </h3>
                </div>
                <div className="text-success-content/70 font-bold">
                  <ul className="flex flex-col gap-1">
                    <li>
                      <Link href="/facebook">Facebook</Link>
                    </li>
                    <li>
                      <Link href="/instagram">Instagram</Link>
                    </li>
                    <li>
                      <Link href="/linkedin">LinkedIn</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div>
                <div>
                  <h3 className="font-black text-success-content text-lg">
                    {t("footer.privacityAndTerms.title")}
                  </h3>
                </div>
                <div className="text-success-content/70 font-bold">
                  <ul className="flex flex-col gap-1">
                    <li>
                      <Link href="/terms">
                        {t("footer.privacityAndTerms.label.terms")}
                      </Link>
                    </li>
                    <li>
                      <Link href="/privacy">
                        {t("footer.privacityAndTerms.label.privacity")}
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </>
  );
}
