"use client";

import { useEffect, useState } from "react";
import { RepeatIcon } from "src/components/Icons";
import GenericExerciseInput from "src/components/InputsAndButtons/GenericExerciseInput";
import { ExercisesProps } from "src/types";
import TTSButtons from "../TTSButtons";

export function WriteDownExercise(props: ExercisesProps) {
  const { data, onCheckAnswer, isMessageActive, onExerciseFail } = props;
  const {
    type,
    prompt,
    compact_translations,
    solution_translation,
    tts,
    hasPreviousError,
  } = data;
  const [selectedOptions, setSelectedOptions] = useState<string>("");
  const answerObj: any = {
    correctAnswers: [compact_translations[0]],
    type,
    compact_translations,
    solutionTranslation: solution_translation
      ? solution_translation
      : undefined,
    selected_option: selectedOptions ? selectedOptions.split(" ") : null,
  };
  const [ttsAudio, setTtsAudio] = useState<HTMLAudioElement | undefined>();
  const [slowTtsAudio, setSlowTtsAudio] = useState<
    HTMLAudioElement | undefined
  >();

  const onInputChange = (str: any) => {
    setSelectedOptions(str.target.value);
  };

  useEffect(() => {
    if (data) {
      setSelectedOptions("");
      const audio = new Audio(tts);
      const slowedTtsAudio = new Audio(tts);
      slowedTtsAudio.playbackRate = 0.5;
      setTtsAudio(audio);
      setSlowTtsAudio(slowedTtsAudio);
    }
  }, [data]);

  return (
    <div className="flex flex-col justify-center items-start h-full max-md:mx-3 gap-10">
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
      <div className="inline-flex gap-x-2 gap-y-5 md:gap-3 text-xl w-full flex-wrap">
        <TTSButtons ttsAudio={ttsAudio} slowTtsAudio={slowTtsAudio} />
        <div className="">{prompt}</div>
      </div>
      <div className="inline-flex gap-3 w-full">
        <GenericExerciseInput
          onInputChange={onInputChange}
          onCheckAnswer={() =>
            selectedOptions &&
            selectedOptions.length > 0 &&
            onCheckAnswer(answerObj)
          }
          selectedOption={selectedOptions}
        />
      </div>
      <div className="inline-flex justify-between w-full h-20 mt-auto">
        <div className="hidden md:w-[13%] md:flex justify-center">
          {!isMessageActive && (
            <button
              className="btn"
              onClick={() =>
                onExerciseFail(
                  compact_translations[0],
                  solution_translation ? solution_translation : undefined
                )
              }
            >
              Skip
            </button>
          )}
        </div>
        <div className="hidden md:w-full md:block"></div>
        <div className="w-full md:w-[13%] flex justify-center">
          {!isMessageActive && (
            <button
              type="button"
              className="btn btn-success max-md:w-full"
              disabled={!selectedOptions || selectedOptions.length === 0}
              onClick={() => onCheckAnswer(answerObj)}
            >
              Check
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
