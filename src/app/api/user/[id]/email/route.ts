import { NextRequest } from "next/server";
import { onSuccessRequest, onThrowError } from "src/app/api/apiService";
import { verifyUserAuth } from "src/shared/apiShared";
import { CustomError } from "src/types/apiTypes";
import { HttpStatusCode } from "src/types/httpStatusCode";
import prisma from "src/app/config/db";
import bcrypt from "bcrypt";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  try {
    verifyUserAuth(req);
    const id = +params.id;
    if (id === undefined || id === null)
      throw new CustomError({
        errors: [],
        httpStatusCode: HttpStatusCode.BAD_REQUEST,
        msg: "Error parsing request id.",
      });

    let email = await req.json();

    const user = await prisma.user.findUnique({
      where: { id: id },
      select: { password: true },
    });

    if (!user) {
      throw new CustomError({
        errors: [],
        msg: "User not found.",
        httpStatusCode: HttpStatusCode.NOT_FOUND,
      });
    }

    const isUsedEmail = await prisma.user.findUnique({
      where: { email },
    });

    if (isUsedEmail) {
      throw new CustomError({
        errors: [],
        msg: "Email is already exists.",
        httpStatusCode: HttpStatusCode.NOT_FOUND,
      });
    }

    const request = await prisma.user.update({
      where: { id: id },
      data: { email },
      select: { email: true },
    });

    return onSuccessRequest({
      httpStatusCode: HttpStatusCode.OK,
      data: { email: request },
      message: "User password changed successfully.",
    });
  } catch (error: any) {
    return onThrowError(error);
  }
}
