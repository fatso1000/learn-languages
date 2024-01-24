import { NextRequest } from "next/server";
import { onSuccessRequest, onThrowError } from "../../apiService";
import { getSearchQuery } from "src/shared/apiShared";
import { CustomError } from "src/types/apiTypes";
import { HttpStatusCode } from "src/types/httpStatusCode";
import prisma from "src/app/config/db";

export async function GET(req: NextRequest) {
  try {
    const [difficulty, unit_id] = getSearchQuery(req.url, [
      "difficulty",
      "unit_id",
    ]);

    if (!difficulty || !unit_id)
      throw new CustomError({
        errors: [],
        httpStatusCode: HttpStatusCode.BAD_REQUEST,
        msg: "Error parsing request ID.",
      });

    const request = await prisma.exercise.findMany({
      where: { difficulty: difficulty as any, unit: { id: +unit_id } },
      orderBy: { id: "desc" },
      take: 10,
    });

    if (!request) return new Error();

    return onSuccessRequest({
      httpStatusCode: 200,
      data: request,
    });
  } catch (error) {
    return onThrowError(error);
  }
}
