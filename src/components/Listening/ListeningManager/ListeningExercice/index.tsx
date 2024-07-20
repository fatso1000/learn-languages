"use client";
import React, { useState } from "react";
import { IQuestionAndAnswer, PendingContentContent } from "src/types";
import Chat from "./Chat";
import QA from "./QA";
import { ExclamationIcon } from "src/components/Icons";

export default function ListeningExercice({
  data,
  contentId,
  userId,
  values,
  completeListening,
  isCompletedListening,
}: {
  data: PendingContentContent;
  contentId: string;
  userId?: string;
  values: IQuestionAndAnswer[];
  completeListening: (points: number) => void;
  isCompletedListening: boolean;
}) {
  const [exerciceCompleted, setExerciceCompleted] = useState(0);
  const completeExercice = () => {
    const lastExerciceCompleted = exerciceCompleted;
    setExerciceCompleted(lastExerciceCompleted + 1);
  };
  return (
    <>
      <section>
        <h1 className="text-5xl mt-6 mb-3 font-black">{data.title}</h1>
        {isCompletedListening && (
          <div className="border rounded-lg border-secondary h-12 flex justify-center items-center mb-3 gap-2">
            <ExclamationIcon className="text-secondary" />
            <span className="font-medium">
              This listening is already completed, you will not get experience.
            </span>
          </div>
        )}
        {data.details && data.details[0] && (
          <Chat
            details={data.details[0]}
            exerciceCompleted={exerciceCompleted}
          />
        )}
      </section>

      <section className="flex flex-col">
        <div className="h-12">
          <h2 className="text-2xl font-black">Answer this questions!</h2>
          <span>Select the right answer :)</span>
        </div>
        <QA
          contentId={contentId}
          userId={userId}
          values={values}
          exerciceCompleted={exerciceCompleted}
          completeExercice={completeExercice}
          completeListening={completeListening}
          isCompleteSection={isCompletedListening}
        />
      </section>
    </>
  );
}
