import { LockIcon, PlayIcon, StarIcon } from "src/components/Icons";
import { LevelIconProps } from "src/types";

export default function LevelIcon({ state }: LevelIconProps) {
  return (
    <div className="flex justify-center items-center">
      {state === "completed" ? (
        <StarIcon />
      ) : state === "studying" ? (
        <PlayIcon />
      ) : (
        <LockIcon />
      )}
    </div>
  );
}
