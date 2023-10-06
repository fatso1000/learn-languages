// import { BlogListProps } from "src/types/clientTypes";
// import BlogCard from "./blogCard";

const textsList = [
  {
    section: "A1",
    readingTexts: [],
    lockedTexts: 19,
  },
  {
    section: "A2",
    readingTexts: [],
    lockedTexts: 29,
  },
  {
    section: "B1",
    readingTexts: [],
    lockedTexts: 39,
  },
  {
    section: "B2",
    readingTexts: [],
    lockedTexts: 5,
  },
];

export default function ReadingList({ blogs }: any) {
  return (
    <>
      {/* {blogs &&
        blogs.length > 0 &&
        blogs.map((v) => <BlogCard value={v} key={v.id} />)} */}
    </>
  );
}
