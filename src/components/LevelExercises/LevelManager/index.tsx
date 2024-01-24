"use client";
// @ts-ignore
import useSound from "use-sound";
import { useEffect, useRef, useState } from "react";
import { IExercise } from "src/types";
import { areArraysEqual } from "src/shared/helpers";
import { MemoizedExercisesSection } from "./ExercisesSection";
import CompletedLevelSection from "./CompletedLevelSection";

export default function LevelManager({
  data,
  sectionId,
}: {
  data: IExercise[];
  sectionId: number;
}) {
  const [playSuccess] = useSound("sounds/success_sfx.mp3", {
    volume: 1,
  });
  const [playFail] = useSound("sounds/success_2_sfx.mp3", {
    volume: 1,
  });
  const [playWin] = useSound("sounds/win_sfx.mp3", {
    volume: 1,
  });
  // Agregar vidas a esquema de usuario y actualizar su valor en los fallos
  const [lifes, setLifes] = useState(5);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [progressIndex, setProgressIndex] = useState(0);
  const [isLevelCompleted, setIsLevelCompleted] = useState(false);
  const [message, setMessage] = useState<any>({
    text: "",
    active: false,
    type: "error",
  });
  const [queueFailedExercises, setQueueFailedExercises] = useState<IExercise[]>(
    []
  );
  const totalSecondsRef = useRef(0);

  useEffect(() => {
    const timer = setInterval(() => {
      totalSecondsRef.current += 1;
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(totalSecondsRef.current / 60);
  const seconds = totalSecondsRef.current % 60;

  const onCheckAnswer = ({
    answer_by_order,
    correct_answers,
    selectedOption,
    type,
  }: {
    type: string;
    correct_answers: string[];
    answer_by_order: boolean;
    selectedOption: any;
  }) => {
    switch (type) {
      case "Translation":
        if (areArraysEqual(correct_answers, selectedOption)) {
          onExerciseSuccess();
        } else {
          onExerciseFail(correct_answers.join(" "));
        }
        break;
      case "ChooseCorrect":
        if (correct_answers[0] === selectedOption) {
          onExerciseSuccess();
        } else {
          onExerciseFail(correct_answers[0]);
        }
        break;
      case "CompleteSentence":
        // AGREGAR LOGICA PARA QUE PUEDA TOMAR MAS DE UNA OPCION CORRECTA
        console.log(correct_answers, type, answer_by_order, selectedOption);
        if (correct_answers[0] === selectedOption) {
          onExerciseSuccess();
        } else {
          onExerciseFail(correct_answers[0]);
        }
        break;
      case "WriteDown":
        if (areArraysEqual(correct_answers, selectedOption)) {
          onExerciseSuccess();
        } else {
          onExerciseFail(correct_answers.join(" "));
        }
        break;
      case "MultipleChoice":
        return true;
      case "Listening":
        return true;
      default:
        return true;
    }
  };

  const addQueue = (exercise: IExercise) => {
    setQueueFailedExercises([
      ...queueFailedExercises,
      { ...exercise, hasPreviousError: true },
    ]);
  };

  const onNextExercise = () => {
    setMessage({ ...message, active: false });
    setCurrentExercise(currentExercise + 1);
  };

  const onExerciseFail = (correct_answer = "") => {
    if (lifes - 1 === 0) {
      return onLevelFail();
    }
    addQueue(data[currentExercise]);
    setLifes(lifes - 1);
    setMessage({ active: true, text: correct_answer, type: "error" });
    playFail();
  };

  const onExerciseSuccess = () => {
    setProgressIndex(progressIndex + 1);
    if (currentExercise + 1 === data.length + queueFailedExercises.length) {
      playSuccess();
      return onLevelFinished();
    }
    setMessage({ active: true, text: "", type: "success" });
    playSuccess();
  };

  const onLevelFinished = () => {
    setMessage({ active: true, text: "", type: "finished_success" });
  };

  const onLevelFail = () => {
    setMessage({ active: true, text: "", type: "finished_fail" });
  };

  // AGREGAR ANIMACIONES DE FADE IN/OUT CUANDO SE CAMBIE DE PANTALLA
  return (
    <main className="px-4">
      <div className="max-w-[70ch] m-auto">
        <div className="h-[100vh] overflow-hidden flex justify-center flex-col">
          <div className="flex min-h-[100vh] flex-col justify-center">
            {isLevelCompleted ? (
              <CompletedLevelSection
                minutes={minutes}
                seconds={seconds}
                failedExercisesLenght={queueFailedExercises.length}
                exercisesLength={data.length}
                sectionId={sectionId}
              />
            ) : (
              <MemoizedExercisesSection
                currentExercise={currentExercise}
                data={data}
                lifes={lifes}
                message={message}
                onCheckAnswer={onCheckAnswer}
                progressIndex={progressIndex}
                queueFailedExercises={queueFailedExercises}
                onNextExercise={onNextExercise}
                setIsLevelCompleted={(value: boolean) => {
                  setIsLevelCompleted(value);
                  playWin();
                }}
                sectionId={sectionId}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
