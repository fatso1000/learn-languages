"use client";

import { memo, useState } from "react";
import { RepeatIcon } from "src/components/Icons";
import { ExercisesProps } from "src/types";

export function ChooseCorrectExercise(props: ExercisesProps) {
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

  const onButtonClick = (str: string) => {
    setSelectedOption(str);
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
      <div className="inline-flex gap-3 text-xl">
        <div className="">{sentences[0]}</div>
        <span className="font-extrabold">=</span>
        <div className="border text-center border-zinc-600 border-dashed min-w-[70px] border-t-0 border-l-0 border-r-0 border-b-2">
          {selectedOption ? selectedOption : "?"}
        </div>
      </div>
      <div className="inline-flex gap-3">
        {options.map((opt) => (
          <button
            type="button"
            className={`btn rounded-2xl ${
              selectedOption === opt ? "btn-primary" : "btn-accent"
            }`}
            onClick={() => onButtonClick(opt)}
            key={opt}
          >
            {opt}
          </button>
        ))}
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

export const MemoizedChooseCorrectExercise = memo(ChooseCorrectExercise);
