import { NextRequest } from "next/server";
import { onSuccessRequest, onThrowError } from "src/app/api/apiService";
import { verifyUserAuth } from "src/shared/apiShared";
import { CustomError } from "src/types/apiTypes";
import { HttpStatusCode } from "src/types/httpStatusCode";
import prisma from "src/app/config/db";

export async function DELETE(
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

    const request = await prisma.user.delete({
      where: { id: id },
      include: {
        historical: true,
        lives_and_strikes: true,
        profile: true,
        rank: true,
        user_content: true,
        user_courses: true,
      },
    });

    return onSuccessRequest({
      httpStatusCode: HttpStatusCode.OK,
      data: { user: request },
      message: "User deleted successfully.",
    });
  } catch (error: any) {
    return onThrowError(error);
  }
}
