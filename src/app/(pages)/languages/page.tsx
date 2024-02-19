import { LanguagesForm } from "src/components/Form";
import Navbar from "src/components/Navbar";

export default function LanguagesPage(props: any) {
  return (
    <>
      <Navbar props={props} />{" "}
      <main className="mt-4 px-4 sm:px-4 md:px-16">
        <div className="mb-4 min-h-[100svh] overflow-hidden pb-40 pt-20 md:pt-32">
          <div className="relative">
            <div className="relative mx-auto flex items-center flex-col">
              <h1 className="text-6xl  font-black text-center inline-flex justify-center">
                Languages Selection
              </h1>
              <div className="inline-flex flex-wrap w-full gap-3 mb-4 overflow-hidden pb-40 pt-24 items-center justify-center">
                <LanguagesForm />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
