import { validate } from "class-validator";
import { NextRequest, NextResponse } from "next/server";
import { APIContent, CustomError, ContentsPOST } from "types/apiTypes";
import { HttpStatusCode } from "types/httpStatusCode";
import prisma from "src/app/config/db";
import { onSuccessRequest, onThrowError } from "../apiService";
import {
  getSearchQuery,
  groupByContentLevel,
  verifyUserAuth,
} from "src/shared/apiShared";

export async function GET(req: NextRequest) {
  try {
    verifyUserAuth(req);
    const language = getSearchQuery(req.url, ["language"]);
    const type = getSearchQuery(req.url, ["type"]);

    if (!language || !language[0] || !type || !type[0])
      throw new CustomError({
        errors: [],
        httpStatusCode: HttpStatusCode.BAD_REQUEST,
        msg: "Error parsing request type or language.",
      });

    const request = await prisma.content.findMany({
      where: {
        language: { name: { equals: language[0], mode: "insensitive" } },
        type: { equals: type[0] as any },
      },
      include: {
        details: {
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
        msg: "Content not found.",
      });

    const groupedContentByLevel = groupByContentLevel(request as any[]);

    return onSuccessRequest({
      httpStatusCode: 200,
      data: groupedContentByLevel,
    });
  } catch (error: any) {
    return onThrowError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    let body: APIContent = await req.json();
    const bodyType = new ContentsPOST(body);

    const validation = await validate(bodyType);
    if (validation.length > 0) {
      throw new CustomError({
        errors: validation,
        msg: "Error during data validation.",
        httpStatusCode: HttpStatusCode.BAD_REQUEST,
      });
    }

    const request = await prisma.content.create({
      data: {
        details: {
          create: {
            level: body.level,
            description: body.description,
            title: body.title,
            type: body.type,
            text: body.text?.split("\n") || [""],
            stories: body?.stories || [""],
            principal: body.principal || "",
            question_and_answer: {
              create: [...body.question_and_answer],
            },
          } as any,
        },
        language: { connect: { id: body.language_id } },
        title: body.title,
        level: body.level,
        type: body.type as any,
      },
    });
    if (!request)
      throw new CustomError({
        httpStatusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
        msg: "Unexpected error during content creation.",
      });

    return NextResponse.json(request);
  } catch (error: any) {
    return onThrowError(error);
  }
}
