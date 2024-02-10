import Image from "next/image";
import Link from "next/link";
import SignInForm from "src/components/Form/SignInForm";
import Navbar from "src/components/Navbar";

export default function SignIn() {
  return (
    <>
      <Navbar />
      <div>
        <main className="mt-4 px-4 sm:px-4 md:px-16">
          <section className="flex flex-col gap-y-5 max-w-[50ch] m-auto md:border-2 md:p-7 md:rounded-md">
            <h1 className="font-black text-6xl text-center">Sign In</h1>
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
                Forgot password?
              </Link>
              <div className="divider"></div>
              <Link href="/auth/signup" className="btn w-full">
                Sign Up
              </Link>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
