"use client";
// @ts-ignore
import useSound from "use-sound";
import { useEffect, useRef, useState } from "react";
import { IExercise, ILives, onCheckAnswerProps } from "src/types";
import { areArraysEqual } from "src/shared/helpers";
import { ExercisesSection } from "./ExercisesSection";
import CompletedLevelSection from "./CompletedLevelSection";
import LifesModal from "./LifesModal";
import {
  addOrRemoveLifesServer,
  continueOrFailStrikesServer,
} from "src/actions/auth";

export default function LevelManager({
  data,
  sectionId,
  lang,
  userId,
  userLives,
}: {
  data: IExercise[];
  sectionId: number;
  lang: string;
  userId: number;
  userLives: ILives;
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
  const [lives, setLives] = useState<number>(5);
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
    if (userLives.lives) setLives(userLives.lives);
  }, []);

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
    correct_answers,
    selected_option,
    type,
    compact_translations,
    solution_translation,
  }: onCheckAnswerProps) => {
    switch (type) {
      case "Translation":
        if (areArraysEqual(correct_answers, selected_option)) {
          onExerciseSuccess();
        } else {
          onExerciseFail(correct_answers.join(" "));
        }
        break;
      case "ChooseCorrect":
        if (correct_answers[0] === selected_option) {
          onExerciseSuccess();
        } else {
          onExerciseFail(correct_answers[1]);
        }
        break;
      case "CompleteSentence":
        // AGREGAR LOGICA PARA QUE PUEDA TOMAR MAS DE UNA OPCION CORRECTA
        if (correct_answers[0] === selected_option) {
          onExerciseSuccess();
        } else {
          onExerciseFail(correct_answers[1]);
        }
        break;
      case "WriteDown":
        const lowerCaseTranslations = [...compact_translations!].map(
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
          userInput = selected_option
            .join(" ")
            .toLowerCase()
            .replace(/[^\w\s]|_/g, "")
            .split(/([ ,.!]+)/)
            .join("")
            .replace(/\s/g, "")
            .trim();

        if (lowerCaseTranslations.includes(userInput)) {
          onExerciseSuccess(
            !compact_translations!.includes(userInput)
              ? compact_translations![0]
              : undefined
          );
        } else {
          onExerciseFail(correct_answers.join(" "), solution_translation);
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

  const onExerciseFail = async (
    correct_answer?: string,
    translationText?: string
  ) => {
    setLives(lives - 1);
    await addOrRemoveLifesServer(userId, "lose");
    if (lives - 1 === 0) {
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

  const onExerciseSuccess = (correct_answer?: string) => {
    setProgressIndex(progressIndex + 1);
    if (currentExercise + 1 === data.length + queueFailedExercises.length) {
      playSuccess();
      return onLevelFinished();
    }
    setMessage({ active: true, text: correct_answer, type: "success" });
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
    <main className="md:px-4">
      <div className="max-w-[70ch] m-auto">
        <div className="h-[100svh] overflow-hidden flex justify-center flex-col">
          <div className="flex min-h-[100svh] flex-col justify-center">
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
                lives={lives}
                message={message}
                onCheckAnswer={onCheckAnswer}
                progressIndex={progressIndex}
                queueFailedExercises={queueFailedExercises}
                onNextExercise={onNextExercise}
                setIsLevelCompleted={async (value: boolean) => {
                  await continueOrFailStrikesServer(userId);
                  setIsLevelCompleted(value);
                  playWin();
                }}
                onExerciseFail={onExerciseFail}
                sectionId={sectionId}
              />
            )}
            <LifesModal
              isLifesOver={lives === 0}
              sectionId={sectionId}
              isLevel={true}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
