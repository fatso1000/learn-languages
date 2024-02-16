"use client";
import { useEffect, useState } from "react";
import { HeartIconSolid } from "src/components/Icons";
import { addOrRemoveLives } from "src/queryFn";
import { MAX_LIVES } from "src/shared/helpers";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function HeartDropdown({ userId }: { userId: number }) {
  // const [lives, setLives] = useState(0);
  // const [lastLifeDate, setLastLifeDate] = useState<Date>();
  // const [nextLifeDate, setNextLifeDate] = useState<Date>();

  // const [difference, setDifference] = useState<number>(0);

  // const [hours, setHours] = useState<number>(1);
  // const [minutes, setMinutes] = useState<number>(1);
  // const [seconds, setSeconds] = useState<number>(1);

  // const { data } = useSWR(`/api/actions/lives/${userId}`, fetcher);

  // useEffect(() => {
  //   if (!data) return;

  //   const { lives_and_strikes } = data.data;

  //   setLives(lives_and_strikes.lives);
  //   setLastLifeDate(new Date(lives_and_strikes.last_live_date));

  //   const lastLive = new Date(lives_and_strikes.last_live_date);
  //   console.log((lastLive?.getTime() / 1000) * 60 * 60);

  //   setNextLifeDate(
  //     new Date(lastLive.setTime(lastLive.getTime() + 5 * 60 * 1000) / 1000)
  //   );
  // }, [data]);
  // useEffect(() => {
  //   if (!lives || lives === MAX_LIVES || !nextLifeDate) return;

  //   const interval = setInterval(() => {
  //     setDifference((difference) => difference - 1);
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, [lives, nextLifeDate, difference]);

  // useEffect(() => {
  //   const fetch = async () =>
  //     await addOrRemoveLives(userId, { lives: 1 }).then((res) => {
  //       setLives(res.data.lives);
  //       setLastLifeDate(res.data.last_life_date);
  //     });

  //   if (difference === 0 && nextLifeDate) {
  //     const now = new Date();
  //     //setNextLifeDate(new Date(now.setTime(now.getTime() + 5 * 60 * 1000)));

  //     setDifference((nextLifeDate.getTime() - new Date().getTime()) % 1000);
  //     // fetch();
  //     return;
  //   }
  // }, [difference, nextLifeDate, userId]);

  return (
    <div className="dropdown flex justify-center items-center relative">
      <button className="btn max-md:btn-sm btn-ghost flex justify-center items-center gap-1">
        <HeartIconSolid fill="#F87272" className="w-6 h-6" />
        <span className="font-extrabold text-lg">{5}</span>
      </button>

      <h4
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-28 h-10 flex justify-center items-center top-12"
      >
        <span className="font-mono text-xl">
          <span>10</span>:<span>10</span>:<span>10</span>
        </span>
      </h4>
    </div>
  );
}
