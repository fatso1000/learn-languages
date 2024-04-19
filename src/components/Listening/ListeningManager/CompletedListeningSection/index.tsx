import Image from "next/image";
import { CourseIcon } from "src/components/Icons";
export default function CompletedLevelSection({
  experienceObtained,
  isCompletedListening,
}: {
  experienceObtained: number;
  isCompletedListening: boolean;
}) {
  return (
    <section className="w-full ">
      <article className="flex flex-col items-center">
        <h1 className="font-black mt-6 text-5xl md:text-5xl text-center text-success">
          This listening is completed!
        </h1>
        <Image
          src={"https://www.katywang.co.uk/img/misc/stickers/panda.gif"}
          height={20}
          width={20}
          alt="cat"
          className="h-auto w-96"
        />
        <div className="mt-6 flex flex-col min-w-[90px] items-center border-2 rounded-3xl border-secondary">
          <div className="font-black text-secondary-content bg-secondary w-full text-center p-4 rounded-2xl">
            XP
          </div>
          <div className="font-bold p-2 text-secondary inline-flex justify-center items-center">
            <CourseIcon />
            {isCompletedListening ? 0 : experienceObtained}
          </div>
        </div>
      </article>
    </section>
  );
}
