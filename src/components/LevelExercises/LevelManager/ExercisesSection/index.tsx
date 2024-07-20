import { Link } from "src/shared/navigation";
import { HeartIconSolid, XIcon } from "src/components/Icons";
import { MessageModal } from "../..";
import { IExercise, onCheckAnswerProps } from "src/types";
import CurrentExerciseComponent from "../CurrentExercise";

interface Props {
  queueFailedExercises: IExercise[];
  currentExercise: number;
  data: IExercise[];
  onCheckAnswer: (values: onCheckAnswerProps) => void;
  progressIndex: number;
  lives: number;
  message: any;
  onNextExercise: () => void;
  setIsLevelCompleted: (value: boolean) => void;
  sectionId: number;
  onExerciseFail: (
    correct_answer?: string,
    translationText?: string
  ) => Promise<void>;
}

export function ExercisesSection({
  queueFailedExercises,
  currentExercise,
  data,
  onCheckAnswer,
  progressIndex,
  lives,
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
          <span className="font-extrabold text-lg">{lives}</span>
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
