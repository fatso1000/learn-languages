"use client";
import { useTranslations } from "next-intl";
import { memo, useEffect } from "react";
import { continueOrFailStrikesServer } from "src/actions/auth";
import { FireIconSolid, SuccessIconCircle } from "src/components/Icons";
import { hasOneDayPassed, isSameDay } from "src/shared/helpers";
import { IStrikes } from "src/types";

const weekDays = [
  { day: "Su", strike: false },
  { day: "Mo", strike: false },
  { day: "Tu", strike: false },
  { day: "We", strike: false },
  { day: "Th", strike: false },
  { day: "Fr", strike: false },
  { day: "Sa", strike: false },
];

const StrikesDays = memo(function StrikesDays(props: { strikes?: IStrikes }) {
  const { strikes } = props;
  if (!strikes || !strikes.last_strike_date) return null;

  const isLastStrikeToday = isSameDay(
      new Date(strikes.last_strike_date),
      new Date()
    ),
    currentDate = new Date().getDay(),
    maxStrike = Math.min(strikes.strikes_length, 7);
  let todayIndex = isLastStrikeToday ? currentDate + 1 : currentDate;

  const updatedWeekDays = weekDays.map((day, index) => ({
    ...day,
    isToday: index === currentDate,
    strike: index >= todayIndex - maxStrike && index < todayIndex,
  }));

  return (
    <div className="inline-flex bg-error-content p-4 gap-2 rounded-md">
      {updatedWeekDays.map((v) => (
        <div key={v.day} className="flex flex-col items-center">
          <h5
            className={
              v.isToday ? "font-bold text-error" : "text-base-content font-bold"
            }
          >
            {v.day}
          </h5>
          <div
            className={`${v.strike ? "bg-error" : "bg-base-100"} rounded-full`}
          >
            <SuccessIconCircle />
          </div>
        </div>
      ))}
    </div>
  );
});

export default function StrikeDropdown({
  userId,
  strikes,
}: {
  userId: number;
  strikes?: IStrikes;
}) {
  const generics = useTranslations("generics");

  useEffect(() => {
    if (!strikes || strikes?.strikes_length === 0) return;
    const startDate = new Date(),
      endDate = new Date(strikes.last_strike_date),
      hasPassedOneDay = hasOneDayPassed(startDate, endDate);

    if (hasPassedOneDay) {
      continueOrFailStrikesServer(userId);
    }
  }, [userId, strikes]);

  return (
    <div className="dropdown dropdown-end flex justify-center items-center relative">
      <button className="btn max-md:btn-sm btn-ghost text-error flex justify-center items-center gap-1">
        <FireIconSolid />
        <span className="font-extrabold text-lg text-base-content">
          {strikes?.strikes_length || 0}
        </span>
      </button>
      <div
        tabIndex={0}
        className="dropdown-content z-[1] menu p-4 gap-2 shadow bg-error text-error-content flex-col rounded-box flex top-12"
      >
        <div className="inline-flex justify-between items-center">
          <h5 className="font-black text-xl">
            {strikes?.strikes_length || 0} {generics("strike")}
          </h5>
          <FireIconSolid />
        </div>
        <StrikesDays strikes={strikes} />
      </div>
    </div>
  );
}
