import { NextRequest } from "next/server";
import { onSuccessRequest, onThrowError } from "../apiService";
import { getSearchQuery, verifyUserAuth } from "src/shared/apiShared";
import { CustomError } from "src/types/apiTypes";
import { HttpStatusCode } from "src/types/httpStatusCode";
import prisma from "src/app/config/db";

export async function GET(req: NextRequest) {
  try {
    verifyUserAuth(req);
    const userId = getSearchQuery(req.url, ["id"]);
    if (!userId || !userId[0])
      throw new CustomError({
        errors: [],
        httpStatusCode: HttpStatusCode.BAD_REQUEST,
        msg: "Error parsing request ID.",
      });

    const [historical, pendingContent, savedContent] =
      await prisma.$transaction([
        prisma.historical.findMany({
          where: { user_id: +userId },
          include: { content: { include: { details: true } } },
        }),
        prisma.pendingContent.findMany({
          where: {
            user_content_id: +userId,
            is_completed: false,
            marked_as_read: true,
          },
          include: {
            pending_content: {
              include: { content: { include: { language: true } } },
            },
          },
        }),
        prisma.pendingContent.findMany({
          where: {
            user_content_id: +userId,
            marked_as_read: true,
          },
          include: {
            pending_content: {
              include: { content: { include: { language: true } } },
            },
          },
        }),
      ]);

    return onSuccessRequest({
      httpStatusCode: 200,
      data: { historical, pendingContent, savedContent },
    });
  } catch (error) {
    return onThrowError(error);
  }
}
