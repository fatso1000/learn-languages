"use client";
// @ts-ignore
import useSound from "use-sound";
import { useEffect, useRef, useState } from "react";
import { IExercise, onCheckAnswerProps } from "src/types";
import { areArraysEqual } from "src/shared/helpers";
import { ExercisesSection } from "./ExercisesSection";
import CompletedLevelSection from "./CompletedLevelSection";
import LifesModal from "./LifesModal";

export default function LevelManager({
  data,
  sectionId,
  lang,
}: {
  data: IExercise[];
  sectionId: number;
  lang: string;
}) {
  const [playSuccess] = useSound("sounds/success_sfx.mp3", {
      volume: 1,
    }),
    [playFail] = useSound("sounds/success_2_sfx.mp3", {
      volume: 1,
    }),
    [playWin] = useSound("sounds/win_sfx.mp3", {
      volume: 1,
    }),
    [playLose] = useSound("sounds/lose_sfx.mp3", {
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
  const minutes = Math.floor(totalSecondsRef.current / 60);
  const seconds = totalSecondsRef.current % 60;

  useEffect(() => {
    const handleBeforeUnload = (event: any) => {
      const message = "Are you sure you want to leave?";
      event.returnValue = message;
      return message;
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      totalSecondsRef.current += 1;
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const onCheckAnswer = ({
    correctAnswers,
    selectedOption,
    type,
    compactTranslations,
    solutionTranslation,
  }: onCheckAnswerProps) => {
    switch (type) {
      case "Translation":
        if (areArraysEqual(correctAnswers, selectedOption)) {
          onExerciseSuccess();
        } else {
          onExerciseFail(correctAnswers.join(" "));
        }
        break;
      case "ChooseCorrect":
        if (correctAnswers[0] === selectedOption) {
          onExerciseSuccess();
        } else {
          onExerciseFail(correctAnswers[1]);
        }
        break;
      case "CompleteSentence":
        // AGREGAR LOGICA PARA QUE PUEDA TOMAR MAS DE UNA OPCION CORRECTA
        if (correctAnswers[0] === selectedOption) {
          onExerciseSuccess();
        } else {
          onExerciseFail(correctAnswers[1]);
        }
        break;
      case "WriteDown":
        const lowerCaseTranslations = [...compactTranslations!].map(
            (translation) => {
              return translation
                .toLowerCase()
                .replace(/[^\w\s]|_/g, "")
                .split(/([ ,.!]+)/)
                .join("")
                .replace(/\s/g, "")
                .trim();
            }
          ),
          userInput = selectedOption
            .join(" ")
            .toLowerCase()
            .replace(/[^\w\s]|_/g, "")
            .split(/([ ,.!]+)/)
            .join("")
            .replace(/\s/g, "")
            .trim();

        if (lowerCaseTranslations.includes(userInput)) {
          onExerciseSuccess();
        } else {
          onExerciseFail(correctAnswers.join(" "), solutionTranslation);
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
    setMessage({ active: false, text: "", type: "success" });
    setCurrentExercise(currentExercise + 1);
  };

  const onExerciseFail = (
    correct_answer?: string,
    translationText?: string
  ) => {
    setLifes(lifes - 1);
    if (lifes - 1 === 0) {
      return onRunOutHearts();
    }
    addQueue(data[currentExercise]);
    setMessage({
      active: true,
      translationText,
      text: correct_answer,
      type: "error",
    });
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

  const onRunOutHearts = () => {
    playLose();
    setMessage({ active: false, text: "", type: "finished_fail" });
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
              <ExercisesSection
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
                onExerciseFail={onExerciseFail}
                sectionId={sectionId}
              />
            )}
            <LifesModal isLifesOver={lifes === 0} sectionId={sectionId} />
          </div>
        </div>
      </div>
    </main>
  );
}
