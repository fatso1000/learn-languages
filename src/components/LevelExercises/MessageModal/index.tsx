import { memo } from "react";

export function MessageModal(props: {
  message: {
    type: "error" | "success" | "finished_success" | "finished_fail";
    text: string;
    active: boolean;
  };
  onNextExercise: () => void;
  onLevelFinish: () => void;
}) {
  const { message, onNextExercise, onLevelFinish } = props;
  if (!message.active) return <div className="hidden"></div>;
  switch (message.type) {
    case "finished_success":
      return (
        <div className="absolute flex justify-center bg-success text-success-content left-0 bottom-0 p-10 border-t-2 border-dashed w-full items-center">
          <div className="max-w-[70ch] inline-flex justify-between w-full items-center">
            <h3 className="font-bold text-3xl">Good job!</h3>
            <button
              autoFocus
              type="button"
              className="btn"
              onClick={() => onLevelFinish()}
            >
              Continue
            </button>
          </div>
        </div>
      );
    case "success":
      return (
        <div className="absolute flex justify-center bg-success text-success-content left-0 bottom-0 p-10 border-t-2 border-dashed w-full items-center">
          <div className="max-w-[70ch] inline-flex justify-between w-full items-center">
            <h3 className="font-bold text-3xl">Good job!</h3>
            <button
              type="button"
              className="btn text-success-content"
              onClick={() => onNextExercise()}
            >
              Continue
            </button>
          </div>
        </div>
      );
    case "error":
      return (
        <div className="absolute flex justify-center bg-error text-error-content left-0 bottom-0 p-10 border-t-2 border-dashed w-full items-center">
          <div className="max-w-[70ch] inline-flex justify-between w-full items-center">
            <div>
              <h3 className="font-bold text-3xl">Incorrect!</h3>
              <span className="text-lg">Right answer:</span>
              <br />
              <span className="border border-error border-dashed border-t-0 border-l-0 border-r-0 border-b-2">
                {message.text}
              </span>
            </div>
            <div>
              <button
                type="button"
                className="btn"
                onClick={() => onNextExercise()}
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      );

    default:
      return <div></div>;
  }
}

export const MemoizedMessageModal = memo(MessageModal);
