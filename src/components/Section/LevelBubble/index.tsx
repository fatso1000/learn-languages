import Link from "next/link";
import { LevelBubbleProps, LevelState } from "src/types";

export default function LevelBubble({
  state,
  href,
  difficulty,
}: LevelBubbleProps) {
  return (
    <div
      tabIndex={0}
      className={`dropdown-content z-40 card card-compact w-64 p-4 shadow-md ${
        state === LevelState.BLOCKED || state === LevelState.FIRST_BLOCKED
          ? "bg-base-200 border-base-200 text-base-content"
          : "bg-success border-success text-success-content"
      } top-32 relative flex flex-col items-center border-2`}
    >
      <div className="card-body text-start !p-0 flex flex-col gap-2 w-full">
        <h3 className="text-lg font-black flex justify-between ">
          Name
          {state === LevelState.STUDYING && (
            <span className="badge badge-success-content font-black border-2 border-success-content badge-outline flex justify-center items-center">
              {difficulty}
            </span>
          )}
        </h3>
        {state === LevelState.STUDYING && (
          <>
            <p>Leccion 1/3.</p>
            <Link
              href={href}
              className="btn bg-success-content hover:bg-success-content text-success shadow-lg "
            >
              Empezar
            </Link>
          </>
        )}
        {state === LevelState.COMPLETED && (
          <>
            <p className="text-base">
              Practica este nivel para tener más puntos.
            </p>
            <Link
              href={href}
              className="btn bg-success-content hover:bg-success-content text-success shadow-lg "
            >
              Practicar
            </Link>
          </>
        )}
        {state !== LevelState.COMPLETED && state !== "studying" && (
          <p className="text-lg font-medium">
            Completa los niveles anteriores para desbloquear este nivel!
          </p>
        )}
      </div>
      <div
        className={`w-4 h-4 arrow ${
          state === LevelState.BLOCKED || state === LevelState.FIRST_BLOCKED
            ? "bg-base-200 border-base-200"
            : "bg-success border-success"
        } border-t-2 border-l-2 rotate-45 -top-2 absolute`}
      />
    </div>
  );
}
