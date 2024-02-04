import HomeHeader from "src/components/HomeHeader";
import Navbar from "src/components/Navbar";

export default async function Home(props: any) {
  return (
    <>
      <Navbar props={props} />
      <main className="px-4">
        <div className="m-auto">
          <header className="h-[calc(100vh-68px)] border-b-2 m-auto overflow-hidden flex justify-center flex-col">
            <HomeHeader />
          </header>
          <section className="h-[100vh] m-auto overflow-hidden flex justify-center flex-col">
            <div className="relative flex items-center justify-between flex-row">
              <div>
                <h2 className="font-light text-5xl leading-none">
                  <span className="font-black text-success">Fast</span> and{" "}
                  <span className="font-black text-info">free</span> :)
                </h2>
                <p className="mt-4 text-xl text-base/60 font-light">
                  Learning with LLO is really easy and the best part, it&apos;s free
                  for everyone! We make this possible so anyone has the chance
                  to practice his skills without limitations.
                </p>
              </div>
              <div></div>
            </div>
          </section>
          <footer>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <div>
                <div>
                  <h3>About</h3>
                </div>
                <div></div>
              </div>
              <div>
                <div>
                  <h3>Help and support</h3>
                </div>
                <div></div>
              </div>
              <div>
                <div>
                  <h3>Languages</h3>
                </div>
                <div></div>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </>
  );
}
