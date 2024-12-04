import { NextRequest } from "next/server";
import prisma from "src/app/config/db";
import { onSuccessRequest, onThrowError } from "../../../apiService";
import { CustomError } from "src/types/apiTypes";
import { HttpStatusCode } from "src/types/httpStatusCode";
import { hasOneDayPassed, isSameDay } from "src/shared/helpers";

export async function GET(req: NextRequest, props: { params: Promise<{ id: number }> }) {
  const params = await props.params;
  try {
    const user_id = Number(params.id);

    const lastStrikeSaved = await prisma.livesAndStrikes.findUnique({
      where: {
        id: user_id,
      },
      select: {
        strikes_length: true,
        last_strike_date: true,
        id: true,
      },
    });

    if (!lastStrikeSaved)
      throw new CustomError({
        errors: [],
        msg: "User does not exist.",
        httpStatusCode: HttpStatusCode.NOT_FOUND,
      });

    const currentDate = new Date();

    if (lastStrikeSaved.last_strike_date) {
      const last_date = new Date(lastStrikeSaved.last_strike_date),
        isExpired = hasOneDayPassed(currentDate, last_date);
      if (isExpired) {
        const strikes = {
          strikes_length: 0,
          last_strike_date: null,
        };
        const request = await prisma.livesAndStrikes.update({
          where: { id: lastStrikeSaved.id },
          data: strikes,
          select: { last_strike_date: true, strikes_length: true },
        });
        return onSuccessRequest({ data: request, httpStatusCode: 200 });
      }
      if (isSameDay(currentDate, last_date)) {
        return onSuccessRequest({ data: {}, httpStatusCode: 200 });
      }
    }

    const request = await prisma.livesAndStrikes.update({
      data: {
        last_strike_date: currentDate,
        strikes_length: lastStrikeSaved.strikes_length + 1,
      },
      where: { id: lastStrikeSaved.id },
    });

    return onSuccessRequest({ data: request, httpStatusCode: 200 });
  } catch (error) {
    return onThrowError(error);
  }
}
