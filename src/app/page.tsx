import HomeHeader from "src/components/HomeHeader";
import Navbar from "src/components/Navbar";

export default async function Home(props: any) {
  return (
    <>
      <Navbar props={props} />
      <div>
        <main className="mt-4 px-4 sm:px-4 md:px-16">
          <HomeHeader />
        </main>
      </div>
    </>
  );
}
