import SignUpForm from "src/components/Form/SignUpForm";
import Navbar from "src/components/Navbar";

export default function SignUp() {
  return (
    <>
      <Navbar />
      <div>
        <main className="mt-4 px-4 sm:px-4 md:px-16">
          <section className="flex flex-col gap-y-5 max-w-[50ch] m-auto">
            <h1 className="font-black text-6xl text-center">SignUp User</h1>
            <SignUpForm />
          </section>
        </main>
      </div>
    </>
  );
}
