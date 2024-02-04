"use client";
import { ILevel, IUnit } from "src/types";
import StudyingBubble from "../StudyingBubble";
import LevelIcon from "../LevelIcon";
import LevelBubble from "../LevelBubble";

const levelStyles = {
  completed: {
    style: "completed",
    borderStyle: "bg-success text-success-content active:bg-[#2B6254]",
  },
  studying: {
    style:
      "studying border-success border-4 rounded-3xl bg-accent active:border-success-content",
    borderStyle:
      "bg-success-content text-success active:bg-success active:text-success-content",

    gradientProgress: (progressPorcent: number) =>
      `conic-gradient(#489380 ${progressPorcent}%,#F2F2F2 ${progressPorcent}%)`,
  },
  "first-blocked": {
    style: "first-blocked blocked",
    borderStyle: "bg-base-300 text-base-content active:bg-[#A1A1A1]",
  },
  blocked: {
    style: "blocked",
    borderStyle: "bg-base-300 text-base-content active:bg-[#A1A1A1]",
  },
};

interface Level {
  level?: ILevel;
  section: { id: string };
  unit?: IUnit;
  row: number;
  state: "completed" | "studying" | "first-blocked" | "blocked";
}

export default function Level(props: Level) {
  const { level, section, unit, row, state } = props;
  let progressPorcent = 0;

  let progress = 3;
  let exercices = 4;

  if (progress && exercices) progressPorcent = (progress * 100) / exercices;

  const gradientProgress =
    state === "studying"
      ? levelStyles[state].gradientProgress(progressPorcent)
      : "";

  const href =
    "/level?difficulty=" +
    "" +
    "&unit_id=" +
    "" +
    "&section_id=" +
    section.id +
    "&lang=" +
    "es";

  return (
    <div
      style={{
        background: gradientProgress,
        gridRow: row + 1 + "/" + (row + 2),
      }}
      className={`${levelStyles[state].style} h-[7.25rem] w-[7.25rem] flex flex-col justify-center items-center level dropdown relative`}
      tabIndex={0}
      role="button"
    >
      {state === "studying" && <StudyingBubble />}
      <div
        className={`${levelStyles[state].borderStyle} rounded-2xl h-24 w-24 flex justify-center z-10 cursor-pointer active:scale-90`}
      >
        <LevelIcon state={state} />
      </div>
      <LevelBubble state={state} />
    </div>
  );
}
