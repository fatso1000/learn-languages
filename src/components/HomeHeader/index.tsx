import Link from "next/link";

export default function HomeHeader() {
  return (
    <>
      <div className="relative flex items-center justify-between flex-row">
        <div>
          <h1 className="text-[clamp(2rem,6vw,4.2rem)] leading-none font-black">
            <span className="text-success">Learn</span> <br />
            <span className="text-info">Languages</span> <br />
            <span className="text-secondary">Online</span>
          </h1>
          <p className="mt-6 text-xl text-base/60 font-light">
            Learn the desired language you want with online tools and content,
            all for free!
          </p>
          <div className="mt-6 inline-flex items-center w-full gap-2 ">
            <Link
              className="btn btn-success group btn-wide px-12 normal-case"
              href="/auth/signup"
            >
              Sign Up
            </Link>
            <Link
              className="btn group btn-wide px-12 normal-case"
              href="/auth/signin"
            >
              Sign In
            </Link>
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
}
