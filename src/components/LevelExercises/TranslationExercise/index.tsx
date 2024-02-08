"use client";

import { useEffect, useState } from "react";
import { RepeatIcon } from "src/components/Icons";
import { areArraysEqual } from "src/shared/helpers";
import { ExercisesProps } from "src/types";
import { IChoice } from "src/types/apiTypes";
import TTSButtons from "../TTSButtons";

const useMultiAudio = (urls: string[]) => {
  const [tts, setTts] = useState<string[]>([]);
  const [audios, setAudios] = useState<HTMLAudioElement[]>([]);

  function toggle(index: number) {
    audios[index].play();
  }

  useEffect(() => {
    if (!areArraysEqual(urls, tts)) {
      setAudios(urls.map((url) => new Audio(url)));
      setTts(urls);
    }
  }, [urls]);

  return [toggle];
};

export function TranslationExercise(props: ExercisesProps) {
  const { data, onCheckAnswer, onExerciseFail, isMessageActive } = props;
  const {
    choices,
    compactTranslations,
    correctAnswers,
    correctSolutions,
    prompt,
    type,
    correctIndices,
    tts,
    hasPreviousError,
  } = data;
  const [selectedOptions, setSelectedOptions] = useState<IChoice[]>([]);
  const [unusedOptions, setUnusedOptions] = useState<IChoice[]>([]);
  const answerObj = {
    correctAnswers,
    correctSolutions,
    compactTranslations,
    correctIndices,
    type,
    selectedOption: selectedOptions.map((option) => option.text),
  };
  const [toggle] = useMultiAudio(
    [...choices!].map((choice) => choice.tts as string)
  );
  const [ttsAudio, setTtsAudio] = useState<HTMLAudioElement | undefined>();

  const onAddOption = (str: IChoice) => {
    toggle(choices.findIndex((choice) => choice.text === str.text));
    const optionsclone = [...selectedOptions];
    optionsclone.push(str);
    setUnusedOptions(unusedOptions.filter((opt) => opt !== str));
    setSelectedOptions(optionsclone);
  };

  const onRemoveOption = (str: IChoice) => {
    const optionsclone = [...unusedOptions];
    optionsclone.push(str);
    setUnusedOptions(optionsclone);
    setSelectedOptions(selectedOptions.filter((opt) => opt !== str));
  };

  useEffect(() => {
    if (choices) {
      setUnusedOptions(choices);
      setSelectedOptions([]);
      setTtsAudio(new Audio(tts));
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
          Escoge el significado correcto
        </h3>
      </div>
      <div className="flex flex-col gap-10 text-xl w-full">
        <div className="inline-flex items-center gap-4 flex-wrap">
          <TTSButtons ttsAudio={ttsAudio} />
          <span className="flex-1">{prompt}</span>
        </div>
        <div className="inline-flex flex-wrap border text-center border-dashed min-h-[52px] border-t-0 border-l-0 border-r-0 border-b-2 gap-2 min-w-[70px]">
          {selectedOptions.map((opt) => (
            <button
              type="button"
              key={opt.text}
              className="btn rounded-2xl"
              onClick={() => onRemoveOption(opt)}
            >
              {opt.text}
            </button>
          ))}
        </div>
      </div>
      <div className="inline-flex gap-3 flex-wrap">
        {unusedOptions.map((opt, i) => (
          <button
            type="button"
            className={"btn rounded-2xl btn-success"}
            onClick={() => onAddOption(opt)}
            key={opt.text}
          >
            {opt.text}
          </button>
        ))}
      </div>
      <div className="inline-flex justify-between w-full h-20 mt-auto">
        <div className="hidden md:w-[13%] md:flex justify-center">
          {!isMessageActive && (
            <button
              className="btn"
              onClick={() => onExerciseFail(correctAnswers[0])}
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
              disabled={selectedOptions.length === 0}
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
