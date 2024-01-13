import Link from "next/link";
import React from "react";
import CarouselComponent from "src/components/Carousel";
import {
  ActivitiesIcon,
  LanguageIcon,
  ListeningIcon,
  ReadingIcon,
} from "src/components/Icons";
import { DashboardProps, SelectedLanguageElement } from "src/types";

export default async function Header(props: {
  data: DashboardProps;
  userName: string;
  selectedLanguage: SelectedLanguageElement;
}) {
  const { data, userName, selectedLanguage } = props;
  return (
    <header className="mb-4 min-h-[100vh] overflow-hidden pb-40 pt-32">
      <div className="relative">
        <div className="relative flex flex-col">
          <h1 className="text-6xl font-black inline-flex items-center">
            Welcome back, {userName}!
          </h1>
          <p className="mt-6 text-xl text-base-content/60 font-light">
            Let&apos;s continue with your learning ;)
          </p>
          <div className="flex flex-col mt-6">
            <div className="inline-flex gap-1">
              <Link
                href={`/${selectedLanguage.details.name}/reading`}
                className="btn btn-primary font-black bg-base-100"
              >
                Readings <ReadingIcon />
              </Link>
              <Link
                href={"/languages"}
                className="btn btn-secondary font-black bg-base-100"
              >
                Languages <LanguageIcon />
              </Link>
              <Link href={""} className="btn btn-accent font-black bg-base-100">
                Listenings <ListeningIcon />
              </Link>
              <Link
                href={""}
                className="btn btn-success font-black bg-base-100"
              >
                Excercises <ActivitiesIcon />
              </Link>
            </div>
          </div>
          <div className="mt-6 flex w-full flex-col gap-2 px-4 xl:px-0">
            <div className="inline-flex w-full justify-between">
              <h2 className="text-2xl leading-6 font-black text-center inline-flex items-center">
                Last contents watched 🦁
              </h2>
              <button className="btn">More</button>
            </div>
            {data && data.historical && data.historical[0] ? (
              <CarouselComponent items={data.historical[0].content || []} />
            ) : (
              <div></div>
            )}
          </div>
          <div className="mt-6 flex w-full flex-col gap-2 px-4 xl:px-0">
            <div className="inline-flex w-full justify-between">
              <h2 className="text-2xl leading-6 font-black text-center inline-flex items-center">
                Not finished content 🦆
              </h2>
              <button className="btn">More</button>
            </div>
            {data && data.pendingContent && data.pendingContent[0] ? (
              <CarouselComponent items={data.pendingContent[0].content || []} />
            ) : (
              <div></div>
            )}
          </div>
          <div className="mt-6 flex w-full flex-col gap-2 px-4 xl:px-0">
            <div className="inline-flex w-full justify-between">
              <h2 className="text-2xl leading-6 font-black text-center inline-flex items-center">
                Saved content 🐈
              </h2>
              <button className="btn">More</button>
            </div>
            {data && data.savedContent && data.savedContent[0] ? (
              <CarouselComponent items={data.savedContent[0].content || []} />
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
