import { NextRequest, NextResponse } from "next/server";
import { onThrowError } from "../apiService";
import { getSearchQuery } from "src/shared/apiShared";
import { CustomError } from "src/types/apiTypes";
import { HttpStatusCode } from "src/types/httpStatusCode";
import prisma from "src/app/config/db";

export async function GET(req: NextRequest) {
  try {
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
        prisma.userContent.findMany({
          where: {
            user_id: +userId,
            content: { every: { marked_as_read: { equals: false } } },
          },
          include: {
            content: {
              include: {
                pending_content: {
                  include: { content: { include: { language: true } } },
                },
              },
            },
          },
        }),
        prisma.userContent.findMany({
          where: {
            user_id: +userId,
          },
          include: {
            content: {
              include: {
                pending_content: {
                  include: { content: { include: { language: true } } },
                },
              },
            },
          },
        }),
      ]);

    return NextResponse.json({ historical, pendingContent, savedContent });
  } catch (error) {
    return onThrowError(error);
  }
}
