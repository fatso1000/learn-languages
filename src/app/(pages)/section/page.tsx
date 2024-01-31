import Link from "next/link";
import Navbar from "src/components/Navbar";
import { getSectionUnits } from "src/queryFn";

export default async function Section(props: any) {
  if (!props.searchParams || !props.searchParams.id) return <div></div>;
  const request = await getSectionUnits(props.searchParams.id);

  if (!request.data) return <div></div>;

  return (
    <>
      <Navbar props={props} />
      <main className="mt-4 px-4 sm:px-4 md:px-16">
        <div className="mb-4 min-h-[100vh] overflow-hidden pb-40 pt-32">
          <div className="m-3">
            <h1>{request.data.title}</h1>
            <p>{request.data.description}</p>
          </div>
          <div className="flex flex-col gap-3">
            {request.data.units.map((unit) => {
              return (
                <div
                  key={unit.id}
                  className={`flex flex-col items-center justify-center rounded`}
                >
                  <div className="bg-lime-700 w-full rounded p-1">
                    <h3>{unit.title}</h3>
                    <p>{unit.description}</p>
                  </div>
                  <div className="flex flex-col items-center gap-5">
                    {unit.levels.map((level, i) => {
                      if (i > unit.completed_levels) {
                        return (
                          <Link
                            key={level.id}
                            href={
                              "/level?difficulty=" +
                              level.difficulty +
                              "&unit_id=" +
                              unit.id +
                              "&section_id=" +
                              props.searchParams.id +
                              "&lang=" +
                              "es"
                            }
                            className="bg-red-500 rounded-full h-10 w-10"
                          ></Link>
                        );
                      }
                      return (
                        <Link
                          key={level.id}
                          href={
                            "/level?difficulty=" +
                            level.difficulty +
                            "&unit_id=" +
                            unit.id +
                            "&section_id=" +
                            props.searchParams.id +
                            "&lang=" +
                            "es"
                          }
                          className="bg-lime-500 rounded-full h-10 w-10"
                        ></Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
}
