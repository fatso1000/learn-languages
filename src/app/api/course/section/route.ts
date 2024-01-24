import { NextRequest } from "next/server";
import { onSuccessRequest, onThrowError } from "../../apiService";
import { getSearchQuery } from "src/shared/apiShared";
import { CustomError } from "src/types/apiTypes";
import { HttpStatusCode } from "src/types/httpStatusCode";
import prisma from "src/app/config/db";

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
      // where: { course: { id: +course_id } },
      where: { course: { sections: { some: { id: +section_id } } } },
      include: {
        completed_levels: true,
        course: {
          include: {
            sections: {
              include: {
                units: {
                  include: { levels: true },
                },
              },
            },
          },
        },
      },
    });

    if (!request) return new Error();

    const groupedData = groupBy(request.completed_levels, "unitId");
    request.course.sections = [...request.course.sections].filter(
      (section) => section.id === +section_id
    );

    if (request.course.sections.length === 0) {
      return {};
    }

    const section = request.course.sections[0];

    section.units = section.units.map((unit) => {
      if (groupedData[unit.id]) {
        if (groupedData[unit.id].length === unit.levels.length) {
          return { ...unit, completed: true, completed_levels: 3 };
        } else {
          return {
            ...unit,
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
