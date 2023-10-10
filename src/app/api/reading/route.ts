import { validate } from "class-validator";
import { NextRequest, NextResponse } from "next/server";
import { CustomError, IReadings, ReadingsPOST } from "types/apiTypes";
import { HttpStatusCode } from "types/httpStatusCode";
import prisma from "src/app/config/db";
import { onThrowError } from "../apiService";
import { getSearchQuery } from "src/shared/apiShared";

export async function GET(req: NextRequest) {
  try {
    const name = getSearchQuery(req.url, ["name"]);
    if (!name || !name[0])
      throw new CustomError({
        errors: [],
        httpStatusCode: HttpStatusCode.BAD_REQUEST,
        msg: "Error parsing request name.",
      });

    const request = await prisma.readings.findMany({
      where: { language: { name: { equals: name[0], mode: "insensitive" } } },
      include: {
        reading_texts: {
          include: {
            question_and_answer: true,
          },
        },
      },
    });

    if (!request)
      throw new CustomError({
        errors: [],
        httpStatusCode: HttpStatusCode.NOT_FOUND,
        msg: "Readings not found.",
      });

    return NextResponse.json({ data: request });
  } catch (error: any) {
    return onThrowError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    // verifyUserAuth(req);
    let body: IReadings = await req.json();
    const bodyType = new ReadingsPOST(body);

    const validation = await validate(bodyType);
    if (validation.length > 0) {
      throw new CustomError({
        errors: validation,
        msg: "Error during data validation.",
        httpStatusCode: HttpStatusCode.BAD_REQUEST,
      });
    }

    const request = await prisma.readings.create({
      data: {
        reading_texts: {
          create: [
            ...body.reading_texts.map((reading) => ({
              ...reading,
              text: reading.text.split("\n"),
              question_and_answer: {
                create: [...reading.question_and_answer],
              },
            })),
          ],
        },
        language: { connect: { id: body.language_id } },
        title: body.title,
        locked_texts: 0,
      },
    });
    if (!request)
      throw new CustomError({
        httpStatusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
        msg: "Unexpected error during user registration.",
      });

    return NextResponse.json(request);
  } catch (error: any) {
    return onThrowError(error);
  }
}
