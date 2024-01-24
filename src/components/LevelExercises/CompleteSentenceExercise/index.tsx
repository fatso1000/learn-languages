"use client";

import { memo, useState } from "react";
import { RepeatIcon } from "src/components/Icons";
import { ExercisesProps } from "src/types";

const GetSentences = (sentences: {
  data: string[];
  onInputChange: (value: any) => void;
}) =>
  sentences.data.map((stc) => {
    if (stc === "%complete%") {
      return (
        <input
          key={stc}
          autoFocus
          className="input border border-zinc-600 border-dashed min-w-[70px] mx-2"
          onChange={sentences.onInputChange}
        ></input>
      );
    }
    return <span key={stc}>{stc}</span>;
  });

export function CompleteSentenceExercise(props: ExercisesProps) {
  const { data, onCheckAnswer } = props;
  const {
    sentences,
    options,
    type,
    correct_answers,
    answer_by_order,
    hasPreviousError,
  } = data;
  const [selectedOption, setSelectedOption] = useState<null | string>(null);
  const answerObj = { correct_answers, answer_by_order, type, selectedOption };

  const onInputChange = (str: any) => {
    setSelectedOption(str.target.value);
  };

  return (
    <div className="flex flex-col justify-center items-center h-full gap-10">
      <div className="mt-auto">
        {hasPreviousError && (
          <div className="inline-flex items-center gap-2">
            <div className="p-2 bg-error rounded-full text-base-100">
              <RepeatIcon />
            </div>
            <span className="text-error font-bold">Previous Error</span>
          </div>
        )}
        <h3 className="font-extrabold text-4xl">
          Escoge el significado correcto
        </h3>
      </div>
      <div className="flex flex-col gap-5 text-xl">
        <div className="font-bold">{options.join(" ")}</div>
        <div className=" text-center min-w-[70px]">
          <GetSentences data={sentences} onInputChange={onInputChange} />
        </div>
      </div>
      <div className="inline-flex justify-between w-full p-10 mt-auto">
        <div className="w-2/12 flex justify-center">
          <button className="btn">Skip</button>
        </div>
        <div className="w-2/3"></div>
        <div className="w-2/12 flex justify-center">
          <button
            type="button"
            className="btn btn-success"
            disabled={!selectedOption}
            onClick={() => onCheckAnswer(answerObj)}
          >
            Check
          </button>
        </div>
      </div>
    </div>
  );
}

export const MemoizedCompleteSentenceExercise = memo(CompleteSentenceExercise);
