import { NextRequest } from "next/server";
import prisma from "src/app/config/db";
import { onSuccessRequest, onThrowError } from "../../../apiService";
import { CustomError } from "src/types/apiTypes";
import { HttpStatusCode } from "src/types/httpStatusCode";
import { MAX_LIVES, calculate2HourIntervals } from "src/shared/helpers";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  try {
    const user_id = Number(params.id);

    const lives = await prisma.user.findUnique({
      where: {
        id: user_id,
      },
      select: { lives_and_strikes: true },
    });

    return onSuccessRequest({
      httpStatusCode: HttpStatusCode.OK,
      data: lives,
    });
  } catch (error) {
    return onThrowError(error);
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  try {
    const { type } = await req.json();
    const user_id = Number(params.id);

    const lastLivesSaved = await prisma.livesAndStrikes.findUnique({
      where: {
        id: user_id,
      },
      select: {
        lives: true,
        last_live_date: true,
        id: true,
      },
    });

    if (!lastLivesSaved)
      throw new CustomError({
        errors: [],
        msg: "User does not exist.",
        httpStatusCode: HttpStatusCode.NOT_FOUND,
      });

    switch (type) {
      case "lose":
        const removeOneLife = Math.max(lastLivesSaved.lives - 1, 0);
        const nowDate = new Date();
        const remove = await prisma.livesAndStrikes.update({
          data: {
            lives: removeOneLife,
            last_live_date: nowDate,
          },
          where: {
            id: lastLivesSaved.id,
          },
        });
        return onSuccessRequest({ data: remove, httpStatusCode: 200 });
      case "sum":
        if (
          lastLivesSaved.last_live_date === null ||
          lastLivesSaved.lives === MAX_LIVES
        )
          break;
        const currentDate = new Date(),
          last_life_date = new Date(lastLivesSaved.last_live_date);
        let calculate = calculate2HourIntervals(
          last_life_date.getTime(),
          currentDate.getTime()
        );
        calculate = calculate >= MAX_LIVES ? MAX_LIVES : calculate;
        let sum = calculate + lastLivesSaved.lives,
          total = sum >= MAX_LIVES ? MAX_LIVES : sum,
          request;

        if (total !== lastLivesSaved.lives)
          request = await prisma.livesAndStrikes.update({
            data: {
              lives: total,
              last_live_date: currentDate,
            },
            where: {
              id: lastLivesSaved.id,
            },
          });

        if (!request)
          return onSuccessRequest({
            data: undefined,
            message: "Lives already full",
            httpStatusCode: 200,
          });

        return onSuccessRequest({
          data: {
            lives: request.lives,
            last_live_date: request.last_live_date,
          },
          httpStatusCode: 200,
        });

      default:
        break;
    }

    throw new CustomError({
      errors: [],
      msg: "Unknown error",
      httpStatusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
    });
  } catch (error) {
    return onThrowError(error);
  }
}
