"use client";
import { LevelProps, LevelState } from "src/types";
import StudyingBubble from "../StudyingBubble";
import LevelIcon from "../LevelIcon";
import LevelBubble from "../LevelBubble";
import { levelColors } from "src/shared/LevelsColors";

const lineColors = {
  primary: {
    completed: "before:!border-primary after:!border-primary",
    studying: "before:!border-primary",
  },
  secondary: {
    completed: "before:!border-secondary after:!border-secondary",
    studying: "before:!border-secondary",
  },
  accent: {
    completed: "before:!border-accent after:!border-accent",
    studying: "before:!border-accent",
  },
  success: {
    completed: "before:!border-success after:!border-success",
    studying: "before:!border-success",
  },
  info: {
    completed: "before:!border-info after:!border-info",
    studying: "before:!border-info",
  },
  error: {
    completed: "before:!border-error after:!border-error",
    studying: "before:!border-error",
  },
};
const levelBloquedStyle = {
  first_blocked: {
    container: "first-blocked blocked",
    content: "bg-base-300 text-base-content active:bg-[#A1A1A1]",
  },
  blocked: {
    container: "blocked",
    content: "bg-base-300 text-base-content active:bg-[#A1A1A1]",
  },
};

export default function LevelComponent(props: LevelProps) {
  const { level, sectionId, unitId, row, state, color } = props;
  let progressPorcent = 0;

  let progress = 3;
  let exercices = 4;

  if (progress && exercices) progressPorcent = (progress * 100) / exercices;

  const gradientProgress =
    state === LevelState.STUDYING
      ? levelColors[color][state].gradientProgress(progressPorcent)
      : "";

  const styleContainer =
    state === LevelState.BLOCKED || state === LevelState.FIRST_BLOCKED
      ? levelBloquedStyle[state].container
      : levelColors[color][state].container;

  const styleContent =
    state === LevelState.BLOCKED || state === LevelState.FIRST_BLOCKED
      ? levelBloquedStyle[state].content
      : levelColors[color][state].content;

  const href =
    "/level?difficulty=" +
    level.difficulty +
    "&unit_id=" +
    unitId +
    "&section_id=" +
    sectionId +
    "&lang=" +
    "es";

  return (
    <button
      style={{
        background: gradientProgress,
        gridRow: row + 1 + "/" + (row + 2),
      }}
      className={`${styleContainer} ${
        (state === LevelState.STUDYING || state === LevelState.COMPLETED) &&
        lineColors[color][state]
      } h-28 w-28 flex flex-col justify-center items-center level dropdown relative`}
      tabIndex={0}
    >
      {state === "studying" && <StudyingBubble />}
      <div
        className={`${styleContent} rounded-2xl h-24 w-24 flex justify-center z-10 cursor-pointer active:scale-90`}
      >
        <LevelIcon state={state} />
      </div>
      <LevelBubble
        level={level}
        state={state}
        href={href}
        difficulty={level.difficulty}
      />
    </button>
  );
}
