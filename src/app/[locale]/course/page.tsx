import Navbar from "src/components/Navbar";
import { getCourseByUserId } from "src/queryFn";
import { ISection } from "src/types";
import Section from "src/components/Course/Section";

export default async function Course(props: {
  params: Promise<{
    locale: string;
  }>;
  searchParams: Promise<{
    id: string;
  }>;
}) {
  if (!props.hasOwnProperty("searchParams") || !(await props.searchParams).id)
    return <div></div>;

  const request = await getCourseByUserId((await props.searchParams).id);

  if (!request.data) return <div></div>;

  return (
    <>
      <Navbar props={props} />
      <main className="mt-4 px-4 sm:px-4 md:px-16 flex items-center justify-center">
        <div className="w-full flex max-w-[643px] flex-col items-center">
          <div className="w-full flex flex-col gap-5">
            <div className="py-4 w-full inline-flex items-center justify-between border-b-2">
              <h1 className="font-black text-xl m-auto z-0 text-base-content opacity-40">
                {request.data.course.title}
              </h1>
            </div>
            <div className="flex flex-col w-full gap-7 md:gap-20 my-7">
              {request.data.course.sections.map((section: ISection, i) => {
                return (
                  <Section section={section} etape={i + 1} key={section.id} />
                );
              })}
              <Section etape={3} isBlocked />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
