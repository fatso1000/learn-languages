"use client";
import { useTranslations } from "next-intl";
import { Link } from "src/shared/navigation";
import { LevelBubbleProps, LevelState } from "src/types";

const colors = {
  primary: {
    box: "bg-primary border-primary text-primary-content",
    badge: "badge-primary-content border-primary-content",
    btn: "bg-primary-content hover:bg-primary-content text-primary",
    arrow: "bg-primary border-primary",
  },
  secondary: {
    box: "bg-secondary border-secondary text-secondary-content",
    badge: "badge-secondary-content border-secondary-content",
    btn: "bg-secondary-content hover:bg-secondary-content text-secondary",
    arrow: "bg-secondary border-secondary",
  },
  accent: {
    box: "bg-accent border-accent text-accent-content",
    badge: "badge-accent-content border-accent-content",
    btn: "bg-accent-content hover:bg-accent-content text-accent",
    arrow: "bg-accent border-accent",
  },
  success: {
    box: "bg-success border-success text-success-content",
    badge: "badge-success-content border-success-content",
    btn: "bg-success-content hover:bg-success-content text-success",
    arrow: "bg-success border-success",
  },
  info: {
    box: "bg-info border-info text-info-content",
    badge: "badge-info-content border-info-content",
    btn: "bg-info-content hover:bg-info-content text-info",
    arrow: "bg-info border-info",
  },
  error: {
    box: "bg-error border-error text-error-content",
    badge: "badge-error-content border-error-content",
    btn: "bg-error-content hover:bg-error-content text-error",
    arrow: "bg-error border-error",
  },
};

export default function LevelBubble({
  state,
  href,
  difficulty,
  level,
  lives,
  color,
}: LevelBubbleProps) {
  const t = useTranslations("pages.section");
  const generics = useTranslations("generics");
  const onButtonClick = () => {
    const modal = document.querySelector("#livesModal") as HTMLDialogElement;
    modal && modal.showModal();
  };

  switch (state) {
    case LevelState.BLOCKED || LevelState.FIRST_BLOCKED:
      return (
        <div
          tabIndex={0}
          className="dropdown-content z-40 card card-compact w-64 p-4 shadow-md bg-base-200 border-base-200 text-base-content top-32 relative flex flex-col items-center border-2"
        >
          <div className="card-body text-start !p-0 flex flex-col gap-2 w-full">
            <h3 className="text-lg font-black flex justify-between ">
              {level.title}
            </h3>
            <p className="text-lg font-medium">{t("levelBlocked")}</p>
          </div>
          <div className="w-4 h-4 arrow bg-base-200 border-base-200 border-t-2 border-l-2 rotate-45 -top-2 absolute" />
        </div>
      );
    case LevelState.STUDYING:
      return (
        <div
          tabIndex={0}
          className={`dropdown-content z-40 card card-compact w-64 p-4 shadow-md top-32 relative flex flex-col items-center border-2 ${colors[color].box}`}
        >
          <div className="card-body text-start !p-0 flex flex-col gap-2 w-full">
            <h3 className="text-lg font-black flex justify-between ">
              {level.title}
              <span
                className={`badge ${colors[color].badge} font-black border-2 badge-outline flex justify-center items-center`}
              >
                {generics(`difficulty.${difficulty}`)}
              </span>
            </h3>
            <p>{t("currentLevel")}</p>
            {/* {lives.lives === 0 ? (
              <div
                className={`btn shadow-lg ${colors[color].btn}`}
                onClick={onButtonClick}
              >
                {t("start")}
              </div>
            ) : (
              <Link
                href={href}
                className={`btn shadow-lg ${colors[color].btn}`}
              >
                {t("start")}
              </Link>
            )} */}
            <div
              className={`btn shadow-lg ${colors[color].btn}`}
              onClick={onButtonClick}
            >
              {t("start")}
            </div>
          </div>
          <div
            className={`w-4 h-4 arrow border-t-2 border-l-2 rotate-45 -top-2 absolute ${colors[color].arrow}`}
          />
        </div>
      );
    default:
      return (
        <div
          tabIndex={0}
          className={`dropdown-content z-40 card card-compact w-64 p-4 shadow-md top-32 relative flex flex-col items-center border-2 ${colors[color].box}`}
        >
          <div className="card-body text-start !p-0 flex flex-col gap-2 w-full">
            <h3 className="text-lg font-black flex justify-between ">
              {level.title}
            </h3>

            <span
              className={`badge ${colors[color].badge} font-black border-2 badge-outline flex justify-center items-center`}
            >
              {generics(`difficulty.${difficulty}`)}
            </span>
            <p className="text-base">{t("practiceLevel")}</p>
            {/* {lives.lives === 0 ? (
              ) : (
                <Link
                href={href}
                className={`btn shadow-lg ${colors[color].btn}`}
                >
                {t("practice")}
                </Link>
              )} */}
            <div
              className={`btn shadow-lg ${colors[color].btn}`}
              onClick={onButtonClick}
            >
              {t("practice")}
            </div>
          </div>
          <div
            className={`w-4 h-4 arrow border-t-2 border-l-2 rotate-45 -top-2 absolute ${colors[color].arrow}`}
          />
        </div>
      );
  }
}
