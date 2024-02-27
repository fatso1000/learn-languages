import { Link } from "src/shared/navigation";
import AnimalComponent from "src/components/Animal";
import CarouselComponent from "src/components/Carousel";
import { CourseIcon, ListeningIcon, ReadingIcon } from "src/components/Icons";
import { colorsListObject } from "src/shared/LevelsColors";
import { DashboardProps, IUser, SelectedLanguageElement } from "src/types";
import { EmblaOptionsType } from "embla-carousel";
import { getTranslations } from "next-intl/server";

export default async function Header(props: {
  data: DashboardProps;
  userName: string;
  selectedLanguage: SelectedLanguageElement;
  currentUser: IUser;
}) {
  const t = await getTranslations("pages.dashboard");
  const generics = await getTranslations("generics");

  const { data, userName, selectedLanguage, currentUser } = props;

  const OPTIONS: EmblaOptionsType = {
    align: "start",
    containScroll: false,
    slidesToScroll: "auto",
  };
  return (
    <header className="mb-4 min-h-[100svh] overflow-hidden py-4">
      <div className="relative flex flex-col">
        <div className="inline-flex items-center gap-3 mb-6 max-md:flex max-md:flex-col max-md:items-start">
          <div className="z-10 max-md:hidden max-md:w-full">
            <div className="rounded-full m-auto w-32 h-32">
              <AnimalComponent
                color={colorsListObject[currentUser.profile.color]}
                animalName={currentUser.profile.animal_name}
                size="8rem"
              />
            </div>
          </div>
          <div className="rounded-t-2xl">
            <h1 className="text-4xl md:text-5xl font-black leading-tight">
              {t("title")} <br />
              <span className="text-5xl md:text-6xl text-info inline-block">
                {userName}!
              </span>
            </h1>
            <p className="text-sm md:text-xl text-base-content/60 font-light">
              {t("subtitle")} ;)
            </p>
          </div>
        </div>
        <div className="flex flex-col mt-1">
          <div className="w-full gap-2 inline-flex flex-wrap">
            <Link
              href={`/${selectedLanguage.details.target_language.name}/reading`}
              className="btn btn-accent max-md:flex-auto h-full font-black gap-y-0"
            >
              {generics("readings")} <ReadingIcon />
            </Link>
            <Link
              href={`/${selectedLanguage.details.target_language.name}/listening`}
              className="btn btn-info max-md:flex-auto h-full font-black gap-y-0"
            >
              {generics("listenings")} <ListeningIcon />
            </Link>
            <Link
              href={"course"}
              className="btn btn-success max-md:flex-auto h-full font-black gap-y-0"
            >
              {generics("course")} <CourseIcon />
            </Link>
          </div>
        </div>
        <div className="mt-8 flex w-full flex-col gap-2">
          <div>
            <div className="inline-flex w-full justify-between">
              <h2 className="text-2xl leading-6 font-black text-center inline-flex items-center">
                {t("contents.lastContentsWatched")}
              </h2>
            </div>
            {/* {data && data.historical && data.historical[0] ? (
              <CarouselComponent
                items={data.historical[0].content.details || []}
              />
            ) : (
              <div>
                <h3>No content watched yet.</h3>
              </div>
            )} */}
          </div>
          <div className="mt-6 flex w-full flex-col gap-2 relative">
            <div className="inline-flex w-full justify-between">
              <h2 className="text-2xl leading-6 font-black text-center inline-flex items-center">
                {t("contents.notDinishedContent")}
              </h2>
            </div>
            {/* {data && data.pendingContent ? (
              <CarouselComponent items={data.pendingContent || []} />
            ) : (
              <div>
                <h3>No unfinished content yet.</h3>
              </div>
            )} */}
          </div>
          <div className="mt-6 flex w-full flex-col gap-2">
            <div className="inline-flex w-full justify-between">
              <h2 className="text-2xl leading-6 font-black text-center inline-flex items-center">
                {t("contents.savedContent")}
              </h2>
            </div>
            {data && data.savedContent ? (
              <CarouselComponent
                items={data.savedContent || []}
                options={OPTIONS}
              />
            ) : (
              <div>
                <h3>No saved content yet.</h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
