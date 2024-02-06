import { NextRequest } from "next/server";
import { onSuccessRequest, onThrowError } from "../../apiService";
import { getSearchQuery } from "src/shared/apiShared";
import { CustomError } from "src/types/apiTypes";
import { HttpStatusCode } from "src/types/httpStatusCode";
import prisma from "src/app/config/db";
import { ILevel, LevelState } from "src/types";

const colors = ["success", "accent", "primary", "info", "secondary", "error"];

function groupBy(array: any[], key: string) {
  return array.reduce((grouped, item) => {
    const groupKey = item[key];
    if (!grouped[groupKey]) {
      grouped[groupKey] = [];
    }
    grouped[groupKey].push(item);

    return grouped;
  }, {});
}

export async function GET(req: NextRequest) {
  try {
    const section_id = getSearchQuery(req.url, ["id"]);
    if (!section_id || !section_id[0])
      throw new CustomError({
        errors: [],
        httpStatusCode: HttpStatusCode.BAD_REQUEST,
        msg: "Error parsing request ID.",
      });

    const request = await prisma.userCourses.findFirst({
      where: { course: { sections: { some: { id: +section_id } } } },
      include: {
        completed_levels: true,
        course: {
          include: {
            sections: {
              include: {
                units: {
                  include: { levels: { orderBy: { id: "asc" } } },
                },
              },
            },
          },
        },
      },
    });

    if (!request)
      throw new CustomError({
        errors: [],
        httpStatusCode: HttpStatusCode.NOT_FOUND,
        msg: "request doesn't exist.",
      });

    const groupedData = groupBy(request.completed_levels, "unitId");
    request.course.sections = [...request.course.sections].filter(
      (section) => section.id === +section_id
    );

    if (request.course.sections.length === 0) {
      throw new CustomError({
        errors: [],
        httpStatusCode: HttpStatusCode.NOT_FOUND,
        msg: "Content not found.",
      });
    }
    const section = request.course.sections[0];

    section.units = section.units.map((unit) => {
      if (groupedData[unit.id]) {
        const levelsGrouped: ILevel[] = groupedData[unit.id];
        const startIndex = Math.floor(Math.random() * (colors.length - 0)) + 0;

        if (groupedData[unit.id].length === unit.levels.length) {
          return {
            ...unit,
            levels: [
              ...unit.levels.map((level, i) => {
                const currentIndex = (startIndex + i) % colors.length;
                const currentColor = colors[currentIndex];
                return {
                  ...level,
                  color: currentColor,
                  state: LevelState.COMPLETED,
                };
              }),
            ],
            completed: true,
            completed_levels: unit.levels.length,
          };
        } else {
          return {
            ...unit,
            levels: [
              ...unit.levels.map((level, i, array) => {
                const currentIndex = (startIndex + i) % colors.length;
                const currentColor = colors[currentIndex];
                const isLevelCompleted = levelsGrouped.some(
                    (lvl) => lvl.id === level.id
                  ),
                  isNextBlocked =
                    array[i + 1] &&
                    levelsGrouped.some((lvl) => lvl.id === array[i + 1].id),
                  isPreviousBlocked =
                    array[i - 1] &&
                    levelsGrouped.some((lvl) => lvl.id === array[i - 1].id);
                return {
                  ...level,
                  color: currentColor,
                  state: isLevelCompleted
                    ? LevelState.COMPLETED
                    : !isNextBlocked && !isPreviousBlocked
                    ? LevelState.BLOCKED
                    : LevelState.STUDYING,
                };
              }),
            ],
            completed: false,
            completed_levels: groupedData[unit.id].length,
          };
        }
      }
      return unit;
    });

    return onSuccessRequest({
      httpStatusCode: 200,
      data: section,
    });
  } catch (error) {
    return onThrowError(error);
  }
}
