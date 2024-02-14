"use client";
import { useEffect, useState } from "react";
import { ErrorIconCircle, SuccessIconCircle } from "src/components/Icons";
import { IQuestionAndAnswer } from "src/types";
// @ts-expect-error
import confetti from "canvas-confetti";
import { completeContent } from "src/queryFn";

export default function QA(props: {
  values: IQuestionAndAnswer[];
  isCompleted: boolean;
  userId?: string;
  contentId: string;
}) {
  const [questionAndAnswers, setQuestionAndAnswers] = useState<any[]>([]);

  const { values, isCompleted } = props;

  // section = 52, perder = -13

  useEffect(() => {
    setQuestionAndAnswers(
      values.map((v) => ({
        ...v,
        options: [
          ...v.options.map((x) => ({
            title: x,
            status: "default",
            points: 0,
          })),
        ],
      }))
    );
  }, []);

  const onAnswerClick = (
    answer: any,
    correctAnswer: string,
    question: number
  ) => {
    let response = [...questionAndAnswers];
    const isCorrect = response[question].options.findIndex(
      (x: any) => x.status === "correct"
    );
    if (isCorrect > -1) return;

    if (answer.title !== correctAnswer) {
      response[question] = {
        ...response[question],
        options: [
          ...response[question].options.map((x: any) => {
            return x.title === answer.title
              ? {
                  title: x.title,
                  status: "incorrect",
                  points: -13,
                }
              : x;
          }),
        ],
      };
    } else {
      response[question] = {
        ...response[question],
        options: [
          ...response[question].options.map((x: any) =>
            x.title === answer.title
              ? {
                  title: x.title,
                  status: "correct",
                  points: 13,
                }
              : {
                  title: x.title,
                  status: "completed",
                  points: x.points === null ? 0 : x.points,
                }
          ),
        ],
      };
      confetti({
        particleCount: 150,
        spread: 60,
      });
    }
    setQuestionAndAnswers(response);
  };

  useEffect(() => {
    if (questionAndAnswers.length === 0) return;
    const isQACompleted = questionAndAnswers.every(
      (x: any) =>
        x.options.findIndex((v: any) => v.status === "completed") !== -1
    );
    if (isQACompleted && !isCompleted) {
      const points = questionAndAnswers.reduce((acc, answer) => {
        return (
          acc +
          answer.options.reduce((rd: number, opt: any) => {
            return rd + opt.points;
          }, 0)
        );
      }, 0);
      (async () =>
        await completeContent(props.userId!, points, props.contentId))();
    }
  }, [questionAndAnswers]);

  return (
    <div className="mt-6 flex flex-col gap-y-5">
      {questionAndAnswers.map((v, i: number) => (
        <div key={v.id} className="flex flex-col gap-y-2">
          <h3 className="badge badge-success badge-lg text-lg font-semibold">
            Question {i + 1}:
          </h3>
          <h5 className="ml-1">{v.title}</h5>
          <div className="grid grid-cols-2 gap-2">
            {v.options.map((x: any) => (
              <button
                key={x.title}
                id={x.title}
                onClick={() => onAnswerClick(x, v.correct_answer, i)}
                className={`btn ${
                  x.status === "completed"
                    ? "btn-disabled text-neutral-50"
                    : x.status !== "default"
                    ? x.status === "correct"
                      ? "btn-success text-neutral-50"
                      : "btn-error text-neutral-50 opacity-70"
                    : ""
                }`}
              >
                {x.status !== "default" ? (
                  x.status === "correct" ? (
                    <SuccessIconCircle />
                  ) : (
                    <ErrorIconCircle />
                  )
                ) : null}
                {x.title}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
