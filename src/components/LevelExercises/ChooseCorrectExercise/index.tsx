"use client";

import { useEffect, useState } from "react";
import { RepeatIcon } from "src/components/Icons";
import { ExercisesProps } from "src/types";
import { SoundButton } from "./SoundButton";
import { areArraysEqual } from "src/shared/helpers";
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

export function ChooseCorrectExercise(props: ExercisesProps) {
  const { data, onCheckAnswer, isMessageActive, onExerciseFail } = props;
  const { type, prompt, choices, tts, correctIndex, hasPreviousError } = data;
  const [selectedOption, setSelectedOption] = useState<undefined | string>(
    undefined
  );
  const answerObj = {
    correctAnswers: [choices[correctIndex!].text, prompt!],
    prompt: prompt!,
    type,
    selectedOption,
  };
  const [toggle] = useMultiAudio(
    [...choices!].map((choice) => choice.tts as string)
  );
  const [ttsAudio, setTtsAudio] = useState<HTMLAudioElement>();

  const onButtonClick = (str: string) => {
    setSelectedOption(str);
  };

  useEffect(() => {
    if (data) {
      setSelectedOption("");
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
        <div className="inline-flex items-center gap-4">
          <TTSButtons ttsAudio={ttsAudio} />
          <span>{prompt}</span>
        </div>
      </div>
      <div className="flex flex-col gap-3 w-full">
        {choices.map((choice, i) => (
          <SoundButton
            choice={choice}
            onButtonClick={(text) => {
              toggle(i);
              onButtonClick(text);
            }}
            selectedOption={selectedOption}
            index={i + 1}
            key={choice.text}
          />
        ))}
      </div>
      <div className="inline-flex justify-between w-full h-20 mt-auto">
        <div className="hidden md:w-[13%] md:flex justify-center">
          {!isMessageActive && (
            <button className="btn" onClick={() => onExerciseFail(prompt!)}>
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
