import { ArrowLeftShort } from "src/components/Icons";
import Navbar from "src/components/Navbar";
import Unit from "src/components/Section/Unit";
import { getSectionUnits } from "src/queryFn";

export default async function Section(props: any) {
  if (!props.searchParams || !props.searchParams.id) return <div></div>;
  const request = await getSectionUnits(props.searchParams.id);

  if (!request.data) return <div></div>;
  return (
    <>
      <Navbar props={props} />
      <main
        style={{ minHeight: "calc(100vh - 64px)" }}
        className="overflow-hidden flex flex-col items-center"
      >
        <div className="w-full sm:w-4/5 lg:w-3/5 xl:w-2/5 flex flex-col items-center">
          <div className="py-4 w-full inline-flex items-center justify-between border-b-2">
            <button className="btn btn-ghost self-start rounded-full text-base-content opacity-40">
              <ArrowLeftShort />
            </button>
            <h1 className="font-black text-xl m-auto z-0 text-base-content opacity-40">
              {request.data.title}: {request.data.description}
            </h1>
          </div>
          <div className="w-full flex flex-col gap-10">
            {request.data.units.map((unit) => (
              <Unit
                unit={unit}
                sectionId={props.searchParams.id}
                key={unit.id}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
