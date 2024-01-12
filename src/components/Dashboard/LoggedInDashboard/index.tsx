"use client";
import useSWR from "swr";
import CarouselComponent from "src/components/Carousel";
import {
  ActivitiesIcon,
  LanguageIcon,
  ListeningIcon,
  ReadingIcon,
} from "src/components/Icons";
import { DashboardProps, SelectedLanguageElement } from "src/types";
import Link from "next/link";

// SEPARAR EN COMPONENTE APARTE
const Header = (props: {
  data: DashboardProps;
  selectedLanguage: SelectedLanguageElement;
}) => {
  const { data, selectedLanguage } = props;
  return (
    <header className="mb-4 min-h-[100vh] overflow-hidden pb-40 pt-32">
      <div className="relative">
        <div className="relative flex flex-col">
          <h1 className="text-6xl leading-6 font-black text-center inline-flex items-center">
            Welcome back, Matias!
          </h1>
          <p className="mt-6 text-xl text-base-content/60 font-light">
            Let's continue with your learning ;)
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
};

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function LoggedInDashboard(props: {
  userId: number;
  selectedLanguage: SelectedLanguageElement;
}) {
  const { data } = useSWR(`/api/dashboard?id=${props.userId}`, fetcher);

  return (
    <main className="mt-4 px-4 sm:px-4 md:px-16">
      <Header data={data} selectedLanguage={props.selectedLanguage} />
    </main>
  );
}
