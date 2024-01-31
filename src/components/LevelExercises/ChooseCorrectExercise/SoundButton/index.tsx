"use client";

import { IChoice } from "src/types/apiTypes";

export function SoundButton({
  choice,
  selectedOption,
  onButtonClick,
  index,
}: {
  selectedOption: string | undefined;
  choice: IChoice;
  onButtonClick: (value: string) => void;
  index?: number;
}) {
  const { text } = choice;

  return (
    <button
      type="button"
      className={`btn btn-success gap-0 rounded-2xl w-full ${
        selectedOption === text ? "" : "btn-outline"
      }`}
      onClick={() => onButtonClick(text)}
      key={text}
    >
      {index && (
        <div className="rounded-full text-success text-center flex justify-center items-center bg-base-100 h-6 w-6">
          {index}
        </div>
      )}
      <span className="flex-auto">{text}</span>
    </button>
  );
}
