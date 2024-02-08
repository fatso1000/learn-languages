import Link from "next/link";
import { AccuracyIcon, ClockIcon, CourseIcon } from "src/components/Icons";
import { parseTimeLevelCompleted } from "src/shared/helpers";
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
      <div className="flex flex-col justify-between items-center w-full max-md:px-3 mt-auto gap-14">
        <div>
          <div>
            <Image
              src={"https://www.katywang.co.uk/img/misc/stickers/panda.gif"}
              height={20}
              width={20}
              alt="cat"
              className="h-auto w-full"
            />
          </div>
        </div>
        <div>
          <h1 className="font-black text-3xl md:text-4xl text-center text-success">
            Nivel completado exitosamente!
          </h1>
          <p className="text-center text-base">
            Has acertado en la mayoria de ejercicios
          </p>
        </div>
        <div className="inline-flex gap-5 w-full justify-center">
          <div className="flex flex-col min-w-[90px] items-center border-2 rounded-3xl border-success">
            <div className="font-black text-base-100 bg-success p-4 rounded-2xl">
              {missesStatus}
            </div>
            <div className="font-bold p-2 max-md:text-sm text-center text-success w-full inline-flex justify-center items-center">
              <AccuracyIcon />
              {percentaje.toFixed(0)}%
            </div>
          </div>
          <div className="flex flex-col min-w-[90px] items-center border-2 rounded-3xl border-accent">
            <div className="font-black text-base-100 bg-accent p-4 rounded-2xl w-full text-center">
              Tiempo
            </div>
            <div className="font-bold p-2 text-accent inline-flex justify-center items-center">
              <ClockIcon />
              {parseTimeLevelCompleted(`${minutes}:${seconds}`)}
            </div>
          </div>
          <div className="flex flex-col min-w-[90px] items-center border-2 rounded-3xl border-primary">
            <div className="font-black text-primary-content bg-primary w-full text-center p-4 rounded-2xl">
              XP
            </div>
            <div className="font-bold p-2 text-primary inline-flex justify-center items-center">
              <CourseIcon />
              15
            </div>
          </div>
        </div>
      </div>
      <div className="inline-flex max-md:px-3 justify-between w-full mt-auto p-10">
        <div className="hidden md:w-[13%] md:flex justify-center">
          <Link href="" className="btn">
            Repeat Lesson
          </Link>
        </div>
        <div className="hidden md:w-full md:block"></div>
        <div className="w-full md:w-[13%] flex justify-center">
          <Link
            href={"/section?id=" + sectionId}
            type="button"
            className="btn btn-success max-md:w-full"
          >
            Continue
          </Link>
        </div>
      </div>
    </>
  );
}
