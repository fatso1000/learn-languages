import { IReadingSections } from "src/types";
import ReadingSection from "./ReadingSection";

const textsList: IReadingSections[] = [
  {
    section: "A1",
    readingTexts: [
      {
        title: "My Wonderful Family",
        id: "2",
        description: "My family is very important to me",
      },
      {
        title: "My day",
        id: "3",
        description: "One day of my life",
      },
      {
        title: "My name is John",
        id: "4",
        description: "Sam is looking for a job.",
      },
    ],
    lockedTexts: 19,
  },
  {
    section: "A2",
    readingTexts: [
      {
        title: "My Wonderful Family",
        id: "/",
        description: "My family is very important to me",
      },
      {
        title: "My day",
        id: "/",
        description: "One day of my life",
      },
      {
        title: "My name is John",
        id: "/",
        description: "Sam is looking for a job.",
      },
      {
        title: "My Wonderful Family",
        id: "/",
        description: "My family is very important to me",
      },
      {
        title: "My day",
        id: "/",
        description: "One day of my life",
      },
      {
        title: "My name is John",
        id: "/",
        description: "Sam is looking for a job.",
      },
    ],
    lockedTexts: 29,
  },
  {
    section: "B1",
    readingTexts: [
      {
        title: "My Wonderful Family",
        id: "/",
        description: "My family is very important to me",
      },
      {
        title: "My day",
        id: "/",
        description: "One day of my life",
      },
      {
        title: "My name is John",
        id: "/",
        description: "Sam is looking for a job.",
      },
    ],
    lockedTexts: 39,
  },
  {
    section: "B2",
    readingTexts: [
      {
        title: "My Wonderful Family",
        id: "/",
        description: "My family is very important to me",
      },
      {
        title: "My day",
        id: "/",
        description: "One day of my life",
      },
      {
        title: "My name is John",
        id: "/",
        description: "Sam is looking for a job.",
      },
    ],
    lockedTexts: 5,
  },
];

export default function ReadingList() {
  return (
    <>
      {textsList.map((v) => (
        <ReadingSection {...v} key={v.section} />
      ))}
    </>
  );
}
