import { Link } from "src/shared/navigation";
import { ArrowLeftShort } from "src/components/Icons";
import Navbar from "src/components/Navbar";
import Unit from "src/components/Section/Unit";
import { getSectionUnits } from "src/queryFn";
import { ILives, IUnit, IUser, colors } from "src/types";
import { cookies } from "next/headers";
import LifesModal from "src/components/LevelExercises/LevelManager/LifesModal";

const colorsList = [
  colors.SUCCESS,
  colors.INFO,
  colors.ACCENT,
  colors.SECONDARY,
  colors.ERROR,
  colors.PRIMARY,
];

export default async function Section(props: any) {
  if (!props.searchParams || !props.searchParams.id) return <div></div>;
  const cookieStore = cookies();
  const cookiesObj = {
    current_user: cookieStore.get("current_user"),
    lives: cookieStore.get("lives"),
    strikes: cookieStore.get("strikes"),
  };

  const lives: ILives | undefined =
    cookiesObj.lives && cookiesObj.lives.value !== ""
      ? JSON.parse(cookiesObj.lives.value)
      : undefined;

  const request = await getSectionUnits(props.searchParams.id);

  if (!request.data) return <div></div>;

  return (
    <>
      <Navbar props={props} />
      <main
        style={{ minHeight: "calc(100svh - 64px)" }}
        className="overflow-hidden flex flex-col items-center"
      >
        <div className="w-full flex flex-col items-center max-w-[643px]">
          <div className="py-4 w-full inline-flex items-center justify-between border-b-2">
            <Link
              href={"/course"}
              className="btn btn-ghost self-start rounded-full text-base-content opacity-40"
            >
              <ArrowLeftShort />
            </Link>
            <h1 className="font-black text-xl m-auto z-0 text-base-content opacity-40">
              {request.data.title}: {request.data.description}
            </h1>
          </div>
          <div className="w-full flex flex-col gap-10">
            {request.data.units.map((unit: IUnit, i) => {
              const currentIndexColor = i % colorsList.length;
              return (
                <Unit
                  lives={lives!}
                  unit={unit}
                  sectionId={props.searchParams.id}
                  key={unit.id}
                  color={unit.color}
                />
              );
            })}
          </div>
        </div>
        <LifesModal
          isLevel={false}
          isLifesOver={false}
          sectionId={props.searchParams.id}
        />
      </main>
    </>
  );
}
