import { NextRequest } from "next/server";
import { onSuccessRequest, onThrowError } from "src/app/api/apiService";
import { verifyUserAuth } from "src/shared/apiShared";
import { CustomError } from "src/types/apiTypes";
import { HttpStatusCode } from "src/types/httpStatusCode";
import prisma from "src/app/config/db";

export async function DELETE(req: NextRequest, props: { params: Promise<{ id: number }> }) {
  const params = await props.params;
  try {
    verifyUserAuth(req);
    const id = +params.id;

    if (id === undefined || id === null)
      throw new CustomError({
        errors: [],
        httpStatusCode: HttpStatusCode.BAD_REQUEST,
        msg: "Error parsing request id.",
      });

    const user = await prisma.user.findUnique({
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

    const lives_and_strikes_id = user!.lives_and_strikes_id;
    const profile_id = user!.profile_id;

    const request = await prisma.$transaction([
      prisma.user.delete({
        where: { id },
      }),
      prisma.livesAndStrikes.delete({
        where: { id: lives_and_strikes_id },
      }),
      prisma.userProfile.delete({
        where: { id: profile_id },
      }),
    ]);

    return onSuccessRequest({
      httpStatusCode: HttpStatusCode.OK,
      data: { user: request },
      message: "User deleted successfully.",
    });
  } catch (error: any) {
    return onThrowError(error);
  }
}
