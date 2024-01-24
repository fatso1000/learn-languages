"use client";

import { useEffect, useState, memo } from "react";
import { RepeatIcon } from "src/components/Icons";
import { ExercisesProps } from "src/types";

export function TranslationExercise(props: ExercisesProps) {
  const { data, onCheckAnswer } = props;
  const {
    sentences,
    options,
    type,
    correct_answers,
    answer_by_order,
    hasPreviousError,
  } = data;
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [unusedOptions, setUnusedOptions] = useState<string[]>([]);
  const answerObj = {
    correct_answers,
    answer_by_order,
    type,
    selectedOption: selectedOptions,
  };

  const onAddOption = (str: string) => {
    const optionsclone = [...selectedOptions];
    optionsclone.push(str);
    setUnusedOptions(unusedOptions.filter((opt) => opt !== str));
    setSelectedOptions(optionsclone);
  };

  const onRemoveOption = (str: string) => {
    const optionsclone = [...unusedOptions];
    optionsclone.push(str);
    setUnusedOptions(optionsclone);
    setSelectedOptions(selectedOptions.filter((opt) => opt !== str));
  };

  useEffect(() => {
    if (unusedOptions.length === 0) {
      setUnusedOptions(data.options);
    }
  }, []);

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
      <div className="flex flex-col gap-4 text-xl justify-center">
        <div className="text-center items-center inline-flex gap-1 justify-center">
          <div className="badge badge-primary badge-sm"></div>
          {sentences[0]}
        </div>
        <div className="inline-flex border text-center border-dashed min-h-[52px] min-w-[70px] border-t-0 border-l-0 border-r-0 border-b-2 gap-2">
          {selectedOptions.map((opt) => (
            <button
              type="button"
              key={opt}
              className="btn rounded-2xl btn-primary"
              onClick={() => onRemoveOption(opt)}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
      <div className="inline-flex gap-3">
        {unusedOptions.map((opt) => (
          <button
            type="button"
            className={"btn rounded-2xl btn-accent"}
            onClick={() => onAddOption(opt)}
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
            disabled={selectedOptions.length === 0}
            onClick={() => onCheckAnswer(answerObj)}
          >
            Check
          </button>
        </div>
      </div>
    </div>
  );
}

export const MemoizedTranslationExercise = memo(TranslationExercise);
