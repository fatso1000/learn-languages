"use client";
import { useEffect, useRef } from "react";
import { DisplayToken } from "src/types";

export default function GenericExerciseInput({
  displayTokens,
  selectedOption,
  onInputChange,
  targetLanguage,
  onCheckAnswer,
}: {
  displayTokens?: DisplayToken[];
  selectedOption: string | undefined;
  onInputChange: (value: any) => void;
  targetLanguage?: string;
  onCheckAnswer: () => void;
}) {
  const ref = useRef<any>(null);

  useEffect(() => {
    if (ref.current) ref.current.focus();
  }, [targetLanguage, selectedOption, displayTokens]);

  return (
    <label
      htmlFor="token-12"
      className="py-2 px-3 border-2 h-44 bg-base-200 rounded-xl block grow cursor-pointer text-left"
    >
      {!displayTokens ? (
        <textarea
          value={selectedOption}
          className="bg-transparent border-0 p-0 grow resize-none appearance-none w-full"
          style={{ boxShadow: "none" }}
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck="false"
          ref={ref}
          lang={targetLanguage}
          onChange={onInputChange}
          onKeyUp={(e) => e.key === "Enter" && onCheckAnswer()}
          id="token-12"
        />
      ) : (
        displayTokens.map((token) =>
          token.isBlank ? (
            <span key={token.text} className="inline-block">
              <span className="h-[0] py-0 invisible block">_{token.text}_</span>
              <input
                value={selectedOption}
                className="bg-transparent border border-base-300 border-b-2 border-r-0 border-l-0 border-t-0 p-0"
                style={{ boxShadow: "none" }}
                autoComplete="off"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck="false"
                autoFocus
                ref={ref}
                lang={targetLanguage}
                onChange={onInputChange}
                onKeyUp={(e) => e.key === "Enter" && onCheckAnswer()}
                id="token-12"
              ></input>
            </span>
          ) : (
            <span key={token.text} className="">
              {token.text}
            </span>
          )
        )
      )}
    </label>
  );
}
