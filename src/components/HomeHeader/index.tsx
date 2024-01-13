import flagsDisplayGif from "public/images/flags/flags_display.gif";
import Link from "next/link";
import Image from "next/image";

const FlagRandomDisplay = () => (
  <Image
    className="w-20 h-10 ml-3 shadow-sm"
    src={flagsDisplayGif.src}
    alt=""
    width={80}
    height={40}
  />
);

export default function HomeHeader() {
  return (
    <>
      <header className="mb-4 min-h-[100vh] overflow-hidden pb-40 pt-32">
        <div className="relative">
          <div className="relative mx-auto flex items-center flex-col">
            <h1 className="text-6xl leading-6 font-black text-center inline-flex items-center">
              Learn Languages Online <FlagRandomDisplay />
            </h1>
            <p className="mt-6 text-xl text-base-content/60 font-light">
              Learn the desired language you want with online tools and content,
              all for free!
            </p>
            <div className="mt-6 inline-flex items-center w-full flex-col justify-center gap-2 px-4 md:flex-row xl:px-0">
              <Link
                className="btn md:btn-lg md:btn-wide group px-12 normal-case"
                href="/auth/signup"
              >
                Sign Up
              </Link>
              <Link
                className="btn btn-neutral md:btn-lg md:btn-wide group px-12 normal-case"
                href="/auth/signin"
              >
                Sign In
              </Link>
            </div>
            <section className="flex flex-col gap-y-5">
              <div>
                <h2>READING</h2>
                <p>lorem ipsum</p>
                <a className="link" href="/english/reading">
                  Go to Reading
                </a>
              </div>
            </section>
          </div>
        </div>
      </header>
    </>
  );
}
