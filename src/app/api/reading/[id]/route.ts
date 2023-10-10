import { NextRequest, NextResponse } from "next/server";
import prisma from "src/app/config/db";
import { CustomError } from "src/types/apiTypes";
import { HttpStatusCode } from "src/types/httpStatusCode";
import { onThrowError } from "../../apiService";

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.pathname.slice(13);
    if (!id)
      throw new CustomError({
        errors: [],
        httpStatusCode: HttpStatusCode.BAD_REQUEST,
        msg: "Error parsing request id.",
      });

    let request = await prisma.readingTexts.findUnique({
      where: {
        id: +id,
      },
      include: {
        question_and_answer: true,
      },
    });

    if (!request)
      throw new CustomError({
        errors: [],
        httpStatusCode: HttpStatusCode.NOT_FOUND,
        msg: "Reading not found.",
      });

    // request.text = request.text.split('\n');

    return NextResponse.json({ data: request });
  } catch (error: any) {
    return onThrowError(error);
  }
}
