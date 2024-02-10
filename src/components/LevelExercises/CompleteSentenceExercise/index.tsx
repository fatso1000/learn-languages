"use client";

import { useEffect, useState } from "react";
import { RepeatIcon } from "src/components/Icons";
import GenericExerciseInput from "src/components/InputsAndButtons/GenericExerciseInput";
import { ExercisesProps } from "src/types";
import TTSButtons from "../TTSButtons";

export function CompleteSentenceExercise(props: ExercisesProps) {
  const { data, onCheckAnswer, isMessageActive, onExerciseFail } = props;
  const {
    type,
    display_tokens,
    prompt,
    tts,
    target_language,
    hasPreviousError,
  } = data;
  const [selectedOption, setSelectedOption] = useState<undefined | string>(
    undefined
  );
  const answerObj = {
    correct_answers: [
      display_tokens.find((answer) => answer.isBlank)!.text,
      display_tokens.map((value) => value.text).join(" "),
    ],
    type,
    selected_option: selectedOption,
  };
  const [ttsAudio, setTtsAudio] = useState<HTMLAudioElement | undefined>();

  const onInputChange = (str: any) => {
    setSelectedOption(str.target.value);
  };

  useEffect(() => {
    if (data) {
      setSelectedOption("");
      const audio = new Audio(tts);
      const slowedTtsAudio = new Audio(tts);
      slowedTtsAudio.playbackRate = 0.5;
      setTtsAudio(audio);
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
        <h3 className="font-extrabold text-4xl">Escribe esto en Ingles</h3>
      </div>
      <div className="flex flex-col gap-10 text-xl w-full">
        <div className="inline-flex items-center gap-4">
          <TTSButtons ttsAudio={ttsAudio} />
          <span className="">{prompt}</span>
        </div>
        <div className="text-center min-w-[70px]">
          <GenericExerciseInput
            targetLanguage={target_language}
            displayTokens={display_tokens}
            onInputChange={onInputChange}
            selectedOption={selectedOption}
            onCheckAnswer={() => selectedOption && onCheckAnswer(answerObj)}
          />
        </div>
      </div>
      <div className="inline-flex justify-between w-full h-20 mt-auto">
        <div className="hidden md:w-[13%] md:flex justify-center">
          {!isMessageActive && (
            <button
              className="btn"
              onClick={() =>
                onExerciseFail(
                  display_tokens.map((value) => value.text).join(" ")
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
              disabled={!selectedOption}
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
