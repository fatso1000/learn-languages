import Link from "next/link";
import { HeartIconSolid, XIcon } from "src/components/Icons";
import {
  MemoizedChooseCorrectExercise,
  MemoizedTranslationExercise,
  MemoizedCompleteSentenceExercise,
  MemoizedWriteDownExercise,
  MemoizedMessageModal,
} from "../..";
import { IExercise } from "src/types";
import { memo } from "react";

interface Props {
  queueFailedExercises: IExercise[];
  currentExercise: number;
  data: IExercise[];
  onCheckAnswer: (values: {
    type: string;
    correct_answers: string[];
    answer_by_order: boolean;
    selectedOption: any;
  }) => void;
  progressIndex: number;
  lifes: number;
  message: any;
  onNextExercise: () => void;
  setIsLevelCompleted: (value: boolean) => void;
  sectionId: number;
}

const MemoizedCurrentExerciseComponent = memo(
  function CurrentExerciseComponent({
    currentExercise,
    data,
    queueFailedExercises,
    onCheckAnswer,
    message,
  }: {
    queueFailedExercises: IExercise[];
    currentExercise: number;
    data: IExercise[];
    onCheckAnswer: (values: {
      type: string;
      correct_answers: string[];
      answer_by_order: boolean;
      selectedOption: any;
    }) => void;
    message: any;
  }) {
    let current: any = {};
    if (queueFailedExercises.length > 0 && currentExercise >= data.length) {
      const index = Math.abs(data.length - currentExercise);
      current = queueFailedExercises[index];
    } else {
      current = data[currentExercise];
    }

    switch (current.type) {
      case "Translation":
        return (
          <MemoizedTranslationExercise
            data={current}
            isMessageActive={message.active}
            onCheckAnswer={onCheckAnswer}
            key="translation"
          />
        );
      case "ChooseCorrect":
        return (
          <MemoizedChooseCorrectExercise
            data={current}
            isMessageActive={message.active}
            onCheckAnswer={onCheckAnswer}
            key="choose-correct"
          />
        );
      case "CompleteSentence":
        return (
          <MemoizedCompleteSentenceExercise
            data={current}
            isMessageActive={message.active}
            onCheckAnswer={onCheckAnswer}
            key="complete-sentence"
          />
        );
      case "WriteDown":
        return (
          <MemoizedWriteDownExercise
            data={current}
            isMessageActive={message.active}
            onCheckAnswer={onCheckAnswer}
            key="write-down"
          />
        );
      case "MultipleChoice":
        return <div></div>;
      case "Listening":
        return <div></div>;
      default:
        return <div></div>;
    }
  },
  (prevProps, nextProps) => {
    return prevProps.currentExercise === nextProps.currentExercise;
  }
);

export function ExercisesSection({
  queueFailedExercises,
  currentExercise,
  data,
  onCheckAnswer,
  progressIndex,
  lifes,
  message,
  onNextExercise,
  setIsLevelCompleted,
  sectionId,
}: Props) {
  return (
    <>
      <div className="inline-flex justify-between items-center w-full h-20">
        <div className="w-2/12 flex justify-center">
          <Link href={"/section?id=" + sectionId} className="btn btn-ghost">
            <XIcon />
          </Link>
        </div>
        <div className="w-2/3">
          <progress
            className="w-full progress progress-secondary h-3"
            value={progressIndex}
            max={data.length}
          ></progress>
        </div>
        <div className="w-2/12 flex justify-center items-center gap-1">
          <HeartIconSolid fill="red" className="w-8 h-8" />
          <span className="font-extrabold text-lg">{lifes}</span>
        </div>
      </div>
      <MemoizedCurrentExerciseComponent
        message={message}
        currentExercise={currentExercise}
        data={data}
        onCheckAnswer={onCheckAnswer}
        queueFailedExercises={queueFailedExercises}
      />
      <MemoizedMessageModal
        message={message}
        onNextExercise={onNextExercise}
        onLevelFinish={() => {
          setIsLevelCompleted(true);
        }}
      />
    </>
  );
}

export const MemoizedExercisesSection = memo(ExercisesSection);
