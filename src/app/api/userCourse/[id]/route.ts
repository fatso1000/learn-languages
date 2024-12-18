import { NextRequest } from "next/server";
import prisma from "src/app/config/db";
import { onSuccessRequest, onThrowError } from "../../apiService";
import { verifyUserAuth } from "src/shared/apiShared";
import { CustomError } from "src/types/apiTypes";
import { HttpStatusCode } from "src/types/httpStatusCode";

export async function DELETE(req: NextRequest, props: { params: Promise<{ id: number }> }) {
  const params = await props.params;
  try {
    verifyUserAuth(req);
    const body = await req.json();
    const id = Number(params.id);

    if (!id)
      throw new CustomError({
        errors: [],
        httpStatusCode: HttpStatusCode.BAD_REQUEST,
        msg: "Error parsing request id.",
      });

    const user = await prisma.user.findUnique({
      where: { id: body.user_id },
      include: {
        user_courses: { include: { course: { include: { languages: true } } } },
        profile: { include: { languages: true } },
      },
    });

    if (!user)
      throw new CustomError({
        errors: [],
        msg: "User not found.",
        httpStatusCode: HttpStatusCode.NOT_FOUND,
      });

    const isUserCourseExisting = user.user_courses.find(
      (v) => v.course.languages_id === body.language_combo_id
    );

    if (!isUserCourseExisting)
      throw new CustomError({
        errors: [],
        msg: "Course not found.",
        httpStatusCode: HttpStatusCode.NOT_FOUND,
      });

    const transactions = await prisma.$transaction([
      prisma.userCourses.delete({
        where: {
          id: isUserCourseExisting.id,
        },
      }),
      prisma.userLanguages.delete({
        where: { id },
      }),
    ]);

    if (!transactions[0] || !transactions[1])
      throw new CustomError({
        errors: [],
        msg: "Course or language not found.",
        httpStatusCode: HttpStatusCode.NOT_FOUND,
      });

    const responseUser = await prisma.user.findUnique({
      where: {
        id: body.user_id,
      },
      include: {
        profile: {
          include: {
            languages: {
              include: {
                details: {
                  select: {
                    base_language: true,
                    id: true,
                    base_language_id: true,
                    target_language: true,
                    target_language_id: true,
                  },
                },
              },
            },
          },
        },
        rank: { include: { rank: true } },
        lives_and_strikes: true,
      },
    });
    const { password, ...removePassword } = responseUser!;

    return onSuccessRequest({
      httpStatusCode: HttpStatusCode.OK,
      data: { removePassword },
      message: "User logged in successfully.",
    });
  } catch (error) {
    return onThrowError(error);
  }
}
