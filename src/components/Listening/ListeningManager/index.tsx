"use client";
import ListeningHeader from "./ListeningHeader";
import ListeningExercice from "./ListeningExercice";
import { IQuestionAndAnswer, PendingContentContent } from "src/types";
import { useEffect, useState } from "react";
import CompletedLevelSection from "./CompletedListeningSection";

export default function ListeningManager({
  data,
  contentId,
  userId,
  isCompleteSection,
  values,
  isMarked,
  language,
}: {
  data: PendingContentContent;
  contentId: string;
  userId?: string;
  isCompleteSection: boolean;
  values: IQuestionAndAnswer[];
  isMarked: boolean;
  language?: string;
}) {
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [experienceObtained, setExperienceObtained] = useState<number>(0);
  const [isCompletedListening, setIsCompletedListening] =
    useState<boolean>(false);

  useEffect(() => {
    setIsCompletedListening(isCompleteSection);
  }, []);

  const completeListening = (points: number) => {
    setIsCompleted(true);
    setExperienceObtained(points);
  };

  return (
    <>
      <ListeningHeader
        contentId={contentId}
        isMarked={isMarked}
        userId={userId}
        language={language}
      />
      {isCompleted ? (
        <CompletedLevelSection
          experienceObtained={experienceObtained}
          isCompletedListening={isCompletedListening}
        />
      ) : (
        <ListeningExercice
          data={data}
          contentId={contentId}
          userId={userId}
          values={values}
          completeListening={completeListening}
          isCompletedListening={isCompletedListening}
        />
      )}
    </>
  );
}
