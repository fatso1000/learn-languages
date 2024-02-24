import { Link } from "src/shared/navigation";
import Image from "next/image";

import React from "react";
import { ISection } from "src/types";
import { TrophyIconSolid } from "src/components/Icons";

const colors = {
  primary: {
    base: "bg-primary text-primary-content",
    content: "bg-primary-content text-primary border-primary-content",
    button:
      "bg-primary-content text-primary hover:border-2 hover:border-primary-content hover:text-primary-content hover:bg-primary border-2 border-primary font-black",
  },
  secondary: {
    base: "bg-secondary text-secondary-content",
    content: "bg-secondary-content text-secondary border-secondary-content",
    button:
      "bg-secondary-content text-secondary hover:border-2 hover:border-secondary-content hover:text-secondary-content hover:bg-secondary border-2 border-secondary font-black",
  },
  accent: {
    base: "bg-accent text-accent-content",
    content: "bg-accent-content text-accent border-accent-content",
    button:
      "bg-accent-content text-accent hover:border-2 hover:border-accent-content hover:text-accent-content hover:bg-accent border-2 border-accent font-black",
  },
  success: {
    base: "bg-success text-success-content",
    content: "bg-success-content text-success border-success-content",
    button:
      "bg-success-content text-success hover:border-2 hover:border-success-content hover:text-success-content hover:bg-success border-2 border-success font-black",
  },
  info: {
    base: "bg-info text-info-content",
    content: "bg-info-content text-info border-info-content",
    button:
      "bg-info-content text-info hover:border-info-content hover:text-info-content hover:bg-info border-2 border-info font-black",
  },
  error: {
    base: "bg-error text-error-content",
    content: "bg-error-content text-error border-error-content",
    button:
      "bg-error-content text-error hover:border-2 hover:border-error-content hover:text-error-content hover:bg-error border-2 border-error font-black",
  },
};

export default function Section({
  section,
  etape,
  unitCompleted,
  isBlocked,
}: {
  section?: ISection;
  etape: number;
  unitCompleted?: boolean;
  isBlocked?: boolean;
}) {
  return (
    <div
      className={`${colors[section?.color || "error"].base} ${
        isBlocked ? "grayscale" : ""
      } flex items-center justify-between rounded-2xl w-full p-4 flex-col-reverse md:flex-row md:min-h-52 md:max-h-56`}
    >
      <div className="h-full w-full flex-1 items-start flex flex-col gap-3 ">
        <h3 className="font-black text-3xl leading-none">
          <span className="text-2xl">Etape {etape}:</span> <br />
          {section?.title || "Ejemplo"}
        </h3>
        <div className="flex flex-col w-full">
          <div
            className={`${
              isBlocked ? "hidden" : ""
            } w-full flex justify-center items-center gap-2`}
          >
            <TrophyIconSolid className="h-10 w-10" />
            <div
              className={`w-full h-5 ${
                colors[section?.color || "error"].content
              }  border-2 brightness-125 rounded-full`}
            >
              <div
                style={{ width: 33 + "%" }}
                className={`h-full ${
                  colors[section?.color || "error"].base
                }  rounded-full`}
              />
            </div>
            <span className="font-black text-lg text-center">1/3</span>
          </div>
          <Link
            href={"section?id=" + section?.id}
            className={`w-full md:w-unset h-12 btn ${
              colors[section?.color || "error"].button
            } ${isBlocked ? "btn-disabled !text-base-100" : ""}`}
          >
            {unitCompleted ? "Repasar" : isBlocked ? "Bloqueado" : "Continuar"}
          </Link>
        </div>
      </div>
      <Image
        className="flex-1 w-3/5 h-auto object-contain drop-shadow-xl max-w-[260px]"
        src={
          section?.img_src ||
          "https://www.katywang.co.uk/img/misc/stickers/hare.gif"
        }
        width={100}
        height={80}
        alt={`Image from ${section?.title || "Ejemplo"} section`}
      />
    </div>
  );
}
