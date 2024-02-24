"use client";
import { useEffect, useState } from "react";
import { addOrRemoveLifesServer } from "src/actions/auth";
import { HeartIconSolid } from "src/components/Icons";
import {
  MAX_LIVES,
  addTwoHoursToDate,
  getTimeRemaining,
} from "src/shared/helpers";

const lifesArray = [0, 1, 2, 3, 4];

interface ILives {
  lives: number;
  last_live_date: string;
}

export default function HeartDropdown({
  userId,
  lives,
}: {
  userId: number;
  lives?: ILives;
}) {
  const [timeRemaining, setTimeRemaining] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (!lives || lives?.lives === MAX_LIVES) return;
    const startDate = new Date(),
      endDate = new Date(lives.last_live_date);
    const twoHoursDate = addTwoHoursToDate(endDate),
      timer = getTimeRemaining(startDate, twoHoursDate);

    if (timer.total <= 0) {
      addOrRemoveLifesServer(userId, "sum");
    }

    setTimeRemaining(timer);
  }, [userId, lives]);

  return (
    <div className="dropdown flex justify-center items-center relative">
      <button className="btn max-md:btn-sm text-error btn-ghost flex justify-center items-center gap-1">
        <HeartIconSolid className="w-6 h-6" />
        <span className="font-extrabold text-base-content text-lg">
          {lives?.lives}
        </span>
      </button>

      <div
        tabIndex={0}
        className="dropdown-content z-[1] menu p-4 gap-2 shadow items-center bg-base-100 flex-col rounded-box flex top-12"
      >
        <h5 className="font-black text-xl">Lives</h5>
        <div className="inline-flex">
          {lifesArray.map((v, i) => (
            <HeartIconSolid
              className={
                "w-6 h-6 " + (i + 1 <= lives!.lives ? "text-error" : "")
              }
              key={i}
            />
          ))}
        </div>
        <span className="font-mono text-xl">
          {lives?.lives === MAX_LIVES
            ? ""
            : timeRemaining.hours > 0
            ? "Next life in " + timeRemaining.hours + " hours"
            : timeRemaining.minutes > 0
            ? "Next life in " + timeRemaining.minutes + " minutes"
            : "Next life in " + timeRemaining.seconds + " seconds"}
        </span>
      </div>
    </div>
  );
}
