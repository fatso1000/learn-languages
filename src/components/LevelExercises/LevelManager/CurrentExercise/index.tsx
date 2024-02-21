import { IExercise, onCheckAnswerProps } from "src/types";
import {
  ChooseCorrectExercise,
  CompleteSentenceExercise,
  TranslationExercise,
  WriteDownExercise,
} from "../..";

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

export default CurrentExerciseComponent;
