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

    let { old_password, new_password } = await req.json();

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

    const isMatch = await bcrypt.compare(old_password, user?.password);

    if (!isMatch)
      throw new CustomError({
        errors: [],
        httpStatusCode: HttpStatusCode.BAD_REQUEST,
        msg: "Current password is incorrect",
      });

    new_password = await bcrypt.hash(new_password, 8);

    const request = await prisma.user.update({
      where: { id: id },
      data: { password: new_password },
    });

    const { password, ...currentUser } = request;

    return onSuccessRequest({
      httpStatusCode: HttpStatusCode.OK,
      data: { user: currentUser },
      message: "User password changed successfully.",
    });
  } catch (error: any) {
    return onThrowError(error);
  }
}
