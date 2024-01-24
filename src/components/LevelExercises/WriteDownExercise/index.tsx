"use client";

import { memo, useState } from "react";
import { RepeatIcon } from "src/components/Icons";
import { ExercisesProps } from "src/types";

export function WriteDownExercise(props: ExercisesProps) {
  const { data, onCheckAnswer } = props;
  const {
    sentences,
    options,
    type,
    correct_answers,
    answer_by_order,
    hasPreviousError,
  } = data;
  const [selectedOptions, setSelectedOptions] = useState<string>("");
  const answerObj = {
    correct_answers,
    answer_by_order,
    type,
    selectedOption: selectedOptions ? selectedOptions.split(" ") : null,
  };

  const onInputChange = (str: any) => {
    setSelectedOptions(str.target.value);
  };

  console.log(selectedOptions);

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
          Escribe la siguiente oracion
        </h3>
      </div>
      <div className="inline-flex gap-3 text-xl">
        <div className="">
          {sentences.map((sentence) => (
            <span key={sentence}>{sentence}</span>
          ))}
        </div>
        <span className="font-extrabold">=</span>
        <div className="inline-flex gap-1 border text-center border-zinc-600 border-dashed min-w-[70px] border-t-0 border-l-0 border-r-0 border-b-2">
          {/* MEJORAR A FUTURO PARA CAPTAR ERRORES DE ORTOGRAFIA, MINUSCULAS, MAYUSCULAS Y MAS */}
          {selectedOptions &&
            selectedOptions.split(" ").map((option) => (
              <span key={option} className="text-bold">
                {option}
              </span>
            ))}
        </div>
      </div>
      <div className="inline-flex gap-3 w-2/3">
        <input
          type="text"
          maxLength={30}
          placeholder="Write down your answer"
          className="input input-bordered w-full"
          onChange={onInputChange}
          onKeyDown={(e) => e.key === "Enter" && onCheckAnswer(answerObj)}
        />
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
            disabled={!selectedOptions || selectedOptions.length === 0}
            onClick={() => onCheckAnswer(answerObj)}
          >
            Check
          </button>
        </div>
      </div>
    </div>
  );
}

export const MemoizedWriteDownExercise = memo(WriteDownExercise);
