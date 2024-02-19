import Image from "next/image";
import Link from "next/link";
import HomeHeader from "src/components/HomeHeader";
import Navbar from "src/components/Navbar";

export default async function Home(props: any) {
  return (
    <>
      <Navbar props={props} />
      <main>
        <div className="m-auto">
          <header className="h-[calc(100svh-68px)] px-4 border-b-2 m-auto overflow-hidden flex justify-center flex-col">
            <HomeHeader />
          </header>
          <section className="flex flex-col gap-52">
            <section className="max-w-[1182px] px-4 m-auto mt-32 overflow-hidden flex justify-center flex-col">
              <div className="relative flex items-center justify-center flex-col-reverse gap-7 md:flex-row">
                <div className="md:w-2/5">
                  <h2 className="font-light text-5xl leading-none">
                    <span className="font-black text-success">Fast</span> and{" "}
                    <span className="font-black text-info">free</span> :)
                  </h2>
                  <p className="mt-4 text-xl text-base/60 font-light">
                    Learning with LLO is really easy and the best part,
                    it&apos;s free for everyone! We make this possible so anyone
                    has the chance to practice his skills without limitations.
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
                    <span className="font-black text-success">Feel</span>{" "}
                    <span className="font-black text-accent">free</span>
                  </h2>
                  <p className="mt-4 text-xl text-base/60 font-light">
                    Our platform it&apos;s build in a way where you can go
                    easily and free.
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
                    Start today
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
                    About
                  </h3>
                </div>
                <div className="text-success-content/70 font-bold">
                  <ul className="flex flex-col gap-1">
                    <li>
                      <Link href="/team">Team</Link>
                    </li>
                    <li>
                      <Link href="/purpose">Purpose</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div>
                <div>
                  <h3 className="font-black text-success-content text-lg">
                    Help and support
                  </h3>
                </div>
                <div className="text-success-content/70 font-bold">
                  <ul className="flex flex-col gap-1">
                    <li>
                      <Link href="/faq">Faq</Link>
                    </li>
                    <li>
                      <Link href="/contact">Contact Us</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div>
                <div>
                  <h3 className="font-black text-success-content text-lg">
                    Social
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
                    Privacy and terms
                  </h3>
                </div>
                <div className="text-success-content/70 font-bold">
                  <ul className="flex flex-col gap-1">
                    <li>
                      <Link href="/terms">Terms</Link>
                    </li>
                    <li>
                      <Link href="/privacy">Privacy</Link>
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
