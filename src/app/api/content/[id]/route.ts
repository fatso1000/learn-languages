import { NextRequest } from "next/server";
import prisma from "src/app/config/db";
import { CustomError } from "src/types/apiTypes";
import { HttpStatusCode } from "src/types/httpStatusCode";
import { onSuccessRequest, onThrowError } from "../../apiService";
import { verifyUserAuth } from "src/shared/apiShared";

export async function GET(req: NextRequest) {
  try {
    verifyUserAuth(req);
    const id = req.nextUrl.pathname.slice(13),
      userId = req.nextUrl.searchParams.get("userId");

    if (!id)
      throw new CustomError({
        errors: [],
        httpStatusCode: HttpStatusCode.BAD_REQUEST,
        msg: "Error parsing request id.",
      });

    let isMarked = false,
      checkMarked,
      isCompleted;
    if (userId) {
      checkMarked = await prisma.pendingContent.findFirst({
        where: {
          pending_id: +id,
          user_content_id: +userId,
        },
        include: {
          pending_content: true,
        },
      });
      if (checkMarked) {
        isMarked = checkMarked.marked_as_read;
        isCompleted = checkMarked.is_completed;
      }
    }

    const request = await prisma.content.findUnique({
      where: {
        id: +id,
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
        msg: "Reading not found.",
      });

    return onSuccessRequest({
      httpStatusCode: 200,
      data: { data: request, isMarked, isCompleted },
    });
  } catch (error: any) {
    return onThrowError(error);
  }
}
