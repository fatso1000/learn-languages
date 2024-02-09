import { NextRequest } from "next/server";
import { onSuccessRequest, onThrowError } from "../apiService";
import { getSearchQuery, verifyUserAuth } from "src/shared/apiShared";
import { CustomError } from "src/types/apiTypes";
import { HttpStatusCode } from "src/types/httpStatusCode";
import prisma from "src/app/config/db";
import { getUrl } from "src/queryFn";

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
    const request = await prisma.userCourses.findFirst({
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
    request.course.sections = [...request.course.sections].map((section) => {
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
      return section;
    });

    return onSuccessRequest({
      httpStatusCode: 200,
      data: request,
    });
  } catch (error) {
    return onThrowError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // const request = await prisma.courses.create({ data: {} });
    return onSuccessRequest({ httpStatusCode: 200, data: {} });
  } catch (error) {
    return onThrowError(error);
  }
}
