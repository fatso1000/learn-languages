import {
  ErrorIconCircleSolid,
  SuccessIconCircleSolid,
} from "src/components/Icons";

export function MessageModal(props: {
  message: {
    type: "error" | "success" | "finished_success" | "finished_fail";
    text: string;
    translationText?: string;
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
        <div className="absolute flex justify-center bg-success text-success-content left-0 bottom-0 p-5 md:p-10 border-t-2 border-dashed w-full items-center">
          <div className="max-w-[70ch] inline-flex justify-between w-full max-md:flex-wrap max-md:gap-2 items-center">
            <div>
              <div className="inline-flex items-center gap-2">
                <SuccessIconCircleSolid className="h-16 w-16 fill-base-200" />
                {!message.text && !message.translationText && (
                  <h3 className="font-bold text-xl md:text-3xl">Good job!</h3>
                )}
                <div>
                  {message.text && (
                    <>
                      <h3 className="font-bold text-xl md:text-3xl">
                        Correct solution:
                      </h3>
                      <span className="font-medium">{message.text}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            <button
              type="button"
              autoFocus
              className="btn max-md:w-full"
              onClick={() => onLevelFinish()}
            >
              Continue
            </button>
          </div>
        </div>
      );
    case "success":
      return (
        <div className="absolute flex justify-center bg-success text-success-content left-0 bottom-0 p-5 md:p-10 border-t-2 border-dashed w-full items-center">
          <div className="max-w-[70ch] inline-flex justify-between w-full max-md:flex-wrap max-md:gap-2 items-center">
            <div>
              <div className="inline-flex items-center gap-2">
                <SuccessIconCircleSolid className="h-16 w-16 fill-base-200" />
                {!message.text && !message.translationText && (
                  <h3 className="font-bold text-xl md:text-3xl">Good job!</h3>
                )}
                <div>
                  {message.text && (
                    <>
                      <h3 className="font-bold text-xl md:text-3xl">
                        Correct solution:
                      </h3>
                      <span className="font-medium">{message.text}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            <button
              type="button"
              autoFocus
              className="btn max-md:w-full"
              onClick={() => onNextExercise()}
            >
              Continue
            </button>
          </div>
        </div>
      );
    case "error":
      return (
        <div className="absolute flex justify-center bg-error text-error-content left-0 bottom-0 p-5 md:p-10 border-t-2 border-dashed w-full items-center">
          <div className="max-w-[70ch] inline-flex justify-between w-full max-md:flex-wrap max-md:gap-2 items-center">
            <div>
              <div className="inline-flex items-center gap-2">
                <ErrorIconCircleSolid className="h-16 w-16 fill-base-200" />
                <div>
                  {message.text && (
                    <>
                      <h3 className="font-bold text-xl md:text-3xl">
                        Correct solution:
                      </h3>
                      <span className="font-medium">{message.text}</span>
                    </>
                  )}
                  {message.translationText && (
                    <>
                      <h3 className="font-bold text-xl md:text-3xl">
                        Translation:
                      </h3>
                      <span className="font-medium">
                        {message.translationText}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
            <button
              type="button"
              className="btn max-md:w-full"
              autoFocus
              onClick={() => onNextExercise()}
            >
              Ok
            </button>
          </div>
        </div>
      );

    default:
      return <div></div>;
  }
}
