import Link from "next/link";
interface LevelBubbleProps {
  state: "completed" | "studying" | "first-blocked" | "blocked";
}
export default function LevelBubble({ state }: LevelBubbleProps) {
  return (
    <div
      tabIndex={0}
      className={`dropdown-content z-40 card card-compact w-64 p-2 shadow-md ${
        state === "blocked" || state === "first-blocked"
          ? "bg-base-200 border-base-200 text-base-content"
          : "bg-success border-success text-success-content"
      } top-32 relative flex flex-col items-center border-2`}
    >
      <div className="card-body !p-0 flex flex-col gap-4 w-full">
        <h3 className="card-title flex justify-between ">
          Name
          {state === "studying" && (
            <span className="badge badge-success-content badge-outline flex justify-center items-center">
              Difícil
            </span>
          )}
        </h3>
        {state === "studying" && (
          <>
            <p>Leccion 1/3.</p>
            <Link
              href={"/section?id=1"}
              className="btn bg-success-content hover:bg-success-content hover:text-success shadow-lg "
            >
              Empezar
            </Link>
          </>
        )}
        {state === "completed" && (
          <>
            <p>Practica este nivel para tener más puntos.</p>
            <Link
              href={"/section?id=1"}
              className="btn bg-success-content hover:bg-success-content hover:text-success shadow-lg "
            >
              Practicar
            </Link>
          </>
        )}
        {state !== "completed" && state !== "studying" && (
          <p>Completa los niveles anteriores para desbloquear este nivel!</p>
        )}
      </div>
      <div
        className={`w-4 h-4 arrow ${
          state === "blocked" || state === "first-blocked"
            ? "bg-base-200 border-base-200"
            : "bg-success border-success"
        } border-t-2 border-l-2 rotate-45 -top-2 absolute`}
      />
    </div>
  );
}
