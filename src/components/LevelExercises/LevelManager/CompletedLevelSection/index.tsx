import Link from "next/link";
import { AccuracyIcon, ClockIcon } from "src/components/Icons";
import { parseTimeLevelCompleted } from "src/shared/helpers";
import CatGif from "public/gif/giphy.gif";
import Image from "next/image";

interface Props {
  failedExercisesLenght: number;
  exercisesLength: number;
  minutes: number;
  seconds: number;
  sectionId: number;
}

export default function CompletedLevelSection({
  minutes,
  failedExercisesLenght,
  exercisesLength,
  seconds,
  sectionId,
}: Props) {
  const percentaje = 100 - (failedExercisesLenght / exercisesLength) * 100;
  const missesStatus =
    percentaje > 20
      ? percentaje > 60
        ? percentaje > 90
          ? "Perfect!"
          : "Good Job!"
        : "Nice Try!"
      : "Try again!";

  return (
    <>
      <div className="flex flex-col justify-between items-center w-full mt-auto gap-10">
        <div>
          <div>
            <Image
              src={CatGif.src}
              height={20}
              width={20}
              alt="cat"
              className="h-auto w-full border-2 border-dashed border-zinc-600"
            />
          </div>
        </div>
        <div>
          <h1 className="font-extrabold text-4xl text-center text-success">
            Nivel completado exitosamente!
          </h1>
          <p className="text-center text-lg">
            Has acertado en la mayoria de ejercicios
          </p>
        </div>
        <div className="inline-flex gap-5 w-full justify-center">
          <div className="flex flex-col items-center border-2 rounded-3xl border-success">
            <div className="font-bold text-base-100 bg-success p-5 rounded-2xl">
              {missesStatus}
            </div>
            <div className="font-bold p-2 text-center text-success inline-flex justify-center items-center">
              <AccuracyIcon />
              {percentaje.toFixed(0)}%
            </div>
          </div>
          <div className="flex flex-col items-center border-2 rounded-3xl border-accent">
            <div className="font-bold text-base-100 bg-accent p-5 rounded-2xl">
              Tiempo
            </div>
            <div className="font-bold p-2 text-accent inline-flex justify-center items-center">
              <ClockIcon />
              {parseTimeLevelCompleted(`${minutes}:${seconds}`)}
            </div>
          </div>
        </div>
      </div>
      <div className="inline-flex justify-between w-full mt-auto p-10">
        <div className="w-2/12 flex justify-center">
          <Link href="" className="btn">
            Repeat Lesson
          </Link>
        </div>
        <div className="w-2/3"></div>
        <div className="w-2/12 flex justify-center">
          <Link
            href={"/section?id=" + sectionId}
            type="button"
            className="btn btn-success"
          >
            Continue
          </Link>
        </div>
      </div>
    </>
  );
}
