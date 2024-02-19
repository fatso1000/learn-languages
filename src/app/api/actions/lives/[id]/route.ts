import { NextRequest } from "next/server";
import prisma from "src/app/config/db";
import { onSuccessRequest, onThrowError } from "../../../apiService";
import { CustomError } from "src/types/apiTypes";
import { HttpStatusCode } from "src/types/httpStatusCode";
import { MAX_LIVES } from "src/shared/helpers";

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
    const { lives } = await req.json();
    const user_id = Number(params.id);

    const lastLivesSaved = await prisma.livesAndStrikes.findUnique({
      where: {
        id: user_id,
      },
      select: {
        lives: true,
        last_live_date: true,
      },
    });

    if (!lastLivesSaved)
      throw new CustomError({
        errors: [],
        msg: "User does not exist.",
        httpStatusCode: HttpStatusCode.NOT_FOUND,
      });

    const sumLives = lastLivesSaved.lives + lives;

    const lastLiveDate = lastLivesSaved.last_live_date;

    const isMaxLives = sumLives >= MAX_LIVES;

    const isLiveGain = sumLives > lastLivesSaved.lives;

    const totalLives = isMaxLives ? MAX_LIVES : sumLives;

    const user_lives = await prisma.livesAndStrikes.update({
      where: { id: user_id },
      data: {
        lives: totalLives,
        last_live_date: isMaxLives
          ? null
          : isLiveGain || sumLives === 4
          ? new Date()
          : lastLiveDate,
      },
      select: { lives: true, last_live_date: true },
    });

    return onSuccessRequest({
      httpStatusCode: HttpStatusCode.OK,
      data: user_lives,
    });
  } catch (error) {
    return onThrowError(error);
  }
}
