import Link from "next/link";
import Navbar from "src/components/Navbar";
import Level from "src/components/Section/Level";
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
          <div className="m-3 flex">
            <h1 className="text-success font-bold text-xl opacity-70 z-0">
              {request.data.title}: {request.data.description}
            </h1>
          </div>
          <div className="w-full flex flex-col gap-3">
            {request.data.units.map((unit) => {
              return (
                <Unit unit={unit} section={props.searchParams} key={unit.id} />
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
}
