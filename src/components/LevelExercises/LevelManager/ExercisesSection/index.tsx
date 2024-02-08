import Link from "next/link";
import { HeartIconSolid, XIcon } from "src/components/Icons";
import {
  ChooseCorrectExercise,
  CompleteSentenceExercise,
  MessageModal,
  TranslationExercise,
  WriteDownExercise,
} from "../..";
import { IExercise, onCheckAnswerProps } from "src/types";

interface Props {
  queueFailedExercises: IExercise[];
  currentExercise: number;
  data: IExercise[];
  onCheckAnswer: (values: onCheckAnswerProps) => void;
  progressIndex: number;
  lifes: number;
  message: any;
  onNextExercise: () => void;
  setIsLevelCompleted: (value: boolean) => void;
  sectionId: number;
  onExerciseFail: (correct_answer?: string, translationText?: string) => void;
}

const CurrentExerciseComponent = ({
  currentExercise,
  data,
  queueFailedExercises,
  onCheckAnswer,
  message,
  onExerciseFail,
}: {
  queueFailedExercises: IExercise[];
  currentExercise: number;
  data: IExercise[];
  onCheckAnswer: (values: onCheckAnswerProps) => void;
  message: any;
  onExerciseFail: (correct_answer?: string, translationText?: string) => void;
}) => {
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
        <TranslationExercise
          data={current}
          isMessageActive={message.active}
          onCheckAnswer={onCheckAnswer}
          onExerciseFail={onExerciseFail}
        />
      );
    case "ChooseCorrect":
      return (
        <ChooseCorrectExercise
          data={current}
          isMessageActive={message.active}
          onCheckAnswer={onCheckAnswer}
          onExerciseFail={onExerciseFail}
        />
      );
    case "CompleteSentence":
      return (
        <CompleteSentenceExercise
          data={current}
          isMessageActive={message.active}
          onCheckAnswer={onCheckAnswer}
          onExerciseFail={onExerciseFail}
        />
      );
    case "WriteDown":
      return (
        <WriteDownExercise
          data={current}
          isMessageActive={message.active}
          onCheckAnswer={onCheckAnswer}
          onExerciseFail={onExerciseFail}
        />
      );
    case "MultipleChoice":
      return <div></div>;
    case "Listening":
      return <div></div>;
    default:
      return <div></div>;
  }
};

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
  onExerciseFail,
}: Props) {
  return (
    <>
      <div className="max-w-[90ch] inline-flex justify-between items-center w-full h-20">
        <div className="w-[20%] md:w-[13%] flex justify-center">
          <Link href={"/section?id=" + sectionId} className="link">
            <XIcon />
          </Link>
        </div>
        <div className="w-[60%] md:w-full md:block">
          <progress
            className="w-full progress progress-error h-3"
            value={progressIndex}
            max={data.length}
          ></progress>
        </div>
        <div className="w-[20%] md:w-[13%] flex justify-center items-center gap-1">
          <HeartIconSolid fill="#F87272" className="w-6 h-6" />
          <span className="font-extrabold text-lg">{lifes}</span>
        </div>
      </div>
      <CurrentExerciseComponent
        message={message}
        currentExercise={currentExercise}
        data={data}
        onCheckAnswer={onCheckAnswer}
        queueFailedExercises={queueFailedExercises}
        onExerciseFail={onExerciseFail}
      />
      <MessageModal
        message={message}
        onNextExercise={onNextExercise}
        onLevelFinish={() => {
          setIsLevelCompleted(true);
        }}
      />
    </>
  );
}
