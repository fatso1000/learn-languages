"use client";

import { ExerciseDifficulty } from "@prisma/client";
import { ChangeEvent, useState } from "react";
import Navbar from "src/components/Navbar";
import { experimental_useFormState as useFormState } from "react-dom";
import { ExercisesType } from "src/types";
import { exercisesLevelFormAction } from "src/actions/auth";

const ArrayStringComponent = (props: {
  title: string;
  subTitle?: string;
  name: string;
}) => {
  const [currentText, setCurrentText] = useState("");
  const [strings, setStrings] = useState<string[]>([]);

  const onAddString = (e: string) => setStrings([...strings, e]);
  const onRemoveString = (e: string) =>
    setStrings([...strings].filter((string) => string !== e));
  const onTextChange = (e: ChangeEvent<HTMLInputElement>) =>
    setCurrentText(e.target.value);

  return (
    <div className="p-2 flex flex-col gap-1">
      <h5 className="font-semibold">{props.title}</h5>
      {props.subTitle && (
        <span className="text-base-content/70 ml-2">* {props.subTitle}</span>
      )}
      {strings.map((string, i) => (
        <div className="inline-flex w-full gap-2" key={string + props.name + i}>
          <input
            className="flex flex-auto input input-bordered pointer-events-none"
            type="text"
            value={string}
            name={props.name}
          />
          <button
            className="btn btn-error flex-1"
            type="button"
            onClick={() => onRemoveString(string)}
          >
            delete
          </button>
        </div>
      ))}
      <div className="inline-flex w-full gap-2">
        <input
          className="flex flex-auto input input-bordered border-2"
          type="text"
          onChange={onTextChange}
        />
        <button
          className="btn flex-1"
          type="button"
          onClick={() => onAddString(currentText)}
        >
          add
        </button>
      </div>
    </div>
  );
};

const ExerciseComponent = (props: { type?: string | ExercisesType }) => {
  switch (props.type) {
    case ExercisesType.CHOOSE_CORRECT:
      return (
        <div className="border border-base-300 rounded-md p-2 bg-base-200 -mt-2">
          <div>
            <input
              type="text"
              required
              placeholder="Prompt"
              className="input input-bordered w-full"
              name="prompt"
            />
          </div>
          <ArrayStringComponent
            title="correctAnswers"
            name="correctAnswers"
            subTitle="first string is used for the correct answer index"
          />
          <ArrayStringComponent title="choices" name="choices" key={3} />
        </div>
      );
    case ExercisesType.LISTENING:
      break;
    case ExercisesType.MULTIPLE_CHOICE:
      break;
    case ExercisesType.COMPLETE_SENTENCE:
      return (
        <div className="border border-base-300 rounded-md p-2 bg-base-200 -mt-2">
          <div>
            <input
              type="text"
              required
              placeholder="Prompt"
              className="input input-bordered w-full"
              name="prompt"
            />
          </div>
          <ArrayStringComponent
            title="compactTranslations"
            subTitle="The first string is used for tts"
            name="compactTranslations"
          />
          <ArrayStringComponent
            title="correctSolutions"
            name="correctSolutions"
            subTitle="Use %text% to know where to write. Eg: Hello %world%"
          />
        </div>
      );
    case ExercisesType.TRANSLATION:
      return (
        <div className="border border-base-300 rounded-md p-2 bg-base-200 -mt-2">
          <div>
            <input
              type="text"
              required
              placeholder="Prompt"
              className="input input-bordered w-full"
              name="prompt"
            />
          </div>
          <ArrayStringComponent
            title="compactTranslations"
            name="compactTranslations"
          />
          <ArrayStringComponent
            title="correctSolutions"
            name="correctSolutions"
            subTitle="Same as compactTranslations"
          />
          <ArrayStringComponent
            subTitle="Right choices string"
            title="correctAnswers"
            name="correctAnswers"
          />
          <ArrayStringComponent title="choices" name="choices" />
        </div>
      );
    case ExercisesType.WRITE_DOWN:
      return (
        <div className="border border-base-300 rounded-md p-2 bg-base-200 gap-2 flex flex-col -mt-2">
          <div>
            <input
              type="text"
              required
              placeholder="Prompt"
              className="input input-bordered w-full"
              name="prompt"
            />
          </div>
          <div>
            <input
              type="text"
              required
              placeholder="Solution translation"
              className="input input-bordered w-full"
              name="solutionTranslation"
            />
          </div>
          <ArrayStringComponent
            title="compactTranslations"
            name="compactTranslations"
          />
        </div>
      );

    default:
      return <></>;
  }
};

const languages = ["en", "es", "fr", "de", "it", "jp"];

const exercisesTypes = Object.values(ExercisesType),
  exercisesDifficulties = Object.values(ExerciseDifficulty);

const initialState = {
  errors: [],
  success: false,
};

export default function Exercises(props: any) {
  const [state, formAction] = useFormState(
    exercisesLevelFormAction,
    initialState
  );
  const [type, setType] = useState<string | undefined>(undefined);

  const onTypeChange = (e: ChangeEvent<HTMLSelectElement>) =>
    setType(e.target.value);

  return (
    <>
      {/* <Navbar props={props} /> */}
      <main
        style={{ minHeight: "calc(100svh - 64px)" }}
        className="overflow-hidden flex flex-col items-center"
      >
        {state.success && (
          <div className="flex w-full border rounded-md bg-base-200 p-2 items-center text-center justify-center mb-5">
            <h5 className="font-black text-2xl text-success">
              Exercise saved successfully
            </h5>
          </div>
        )}
        {state.errors && state.errors.length > 0 && (
          <div className="flex w-full border rounded-md bg-base-200 p-2 items-center text-center justify-center mb-5">
            <h5 className="font-black text-2xl text-success">
              {state.errors.map((error, i) => (
                <span className="text-error" key={i}>
                  {error.message}
                </span>
              ))}
            </h5>
          </div>
        )}
        <form
          action={formAction}
          className="w-full flex flex-col gap-3 max-w-[643px]"
        >
          <div className="inline-flex w-full gap-2">
            <button className="btn btn-error flex-1" type="reset">
              Reset
            </button>
            <button className="btn btn-success flex-1" type="submit">
              Submit
            </button>
          </div>
          <div className="inline-flex gap-2">
            <select
              className="select select-bordered flex flex-1"
              name="sourceLanguage"
              required
            >
              <option disabled selected>
                Source Lang
              </option>
              {languages.map((type) => (
                <option value={type} key={type}>
                  {type}
                </option>
              ))}
            </select>
            <select
              className="select select-bordered flex flex-1"
              name="targetLanguage"
              required
            >
              <option disabled selected>
                Target Lang
              </option>
              {languages.map((type) => (
                <option value={type} key={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div>
            <input
              type="number"
              className="input input-bordered w-full"
              placeholder="Unit ID"
              required
              name="unitId"
            />
          </div>
          <div>
            <select
              className="select select-bordered w-full"
              name="difficulty"
              required
            >
              <option disabled selected>
                Difficulty
              </option>
              {exercisesDifficulties.map((type) => (
                <option value={type} key={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div>
            <select
              className="select select-bordered w-full"
              name="type"
              required
              onChange={onTypeChange}
            >
              <option disabled selected>
                Exercise type
              </option>
              {exercisesTypes.map((type) => (
                <option value={type} key={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <ExerciseComponent type={type} />
          <div className="inline-flex w-full gap-2">
            <button className="btn btn-error flex-1" type="reset">
              Reset
            </button>
            <button className="btn btn-success flex-1" type="submit">
              Submit
            </button>
          </div>
        </form>
      </main>
    </>
  );
}
