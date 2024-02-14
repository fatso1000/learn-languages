import { NextRequest } from "next/server";
import prisma from "src/app/config/db";
import { onSuccessRequest, onThrowError } from "../apiService";
import { verifyUserAuth } from "src/shared/apiShared";

export async function POST(req: NextRequest) {
  try {
    verifyUserAuth(req);
    let message = "Content saved successfully";
    const { user_id, id } = await req.json();

    const isExisting = await prisma.pendingContent.findFirst({
      where: {
        pending_content: { content: { id: +id } },
        user_content: { user: { id: +user_id } },
      },
    });

    if (!isExisting) {
      await prisma.pendingContent.create({
        data: {
          is_completed: false,
          marked_as_read: true,
          pending_content: { connect: { id: +id } },
          user_content: { connect: { id: +user_id } },
        },
      });
    } else if (isExisting && !isExisting.marked_as_read) {
      await prisma.pendingContent.update({
        where: { id: isExisting.id },
        data: {
          marked_as_read: true,
        },
      });
    } else {
      await prisma.pendingContent.update({
        where: { id: isExisting.id },
        data: { marked_as_read: false },
      });
    }

    return onSuccessRequest({
      data: { isExisting },
      httpStatusCode: 200,
      message,
    });
  } catch (error) {
    return onThrowError(error);
  }
}
