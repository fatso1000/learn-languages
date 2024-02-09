import Link from "next/link";
import Navbar from "src/components/Navbar";
import { getCourses } from "src/queryFn";

export default async function Course(props: any) {
  const request = await getCourses();

  if (!request.data) return <div></div>;

  return (
    <>
      <Navbar props={props} />
      <main className="mt-4 px-4 sm:px-4 md:px-16">
        <div>
          <h1>{request.data.course.title}</h1>
          <p>{request.data.course.description}</p>
        </div>
        <div className="flex flex-col">
          {request.data.course.sections.map((section) => {
            return (
              <Link
                href={"section?id=" + section.id}
                key={section.id}
                className={`bg-${section.bg_color}-300 h-14 flex flex-col items-center justify-center rounded`}
              >
                <h3>{section.title}</h3>
              </Link>
            );
          })}
        </div>
      </main>
    </>
  );
}
