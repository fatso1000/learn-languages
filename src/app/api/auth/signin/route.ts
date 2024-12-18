import { validate } from "class-validator";
import { NextRequest } from "next/server";
import { CustomError, IUserLogin, UserLoginPOST } from "types/apiTypes";
import {
  onSuccessRequest,
  onThrowError,
  onValidationError,
} from "../../apiService";
import { HttpStatusCode } from "types/httpStatusCode";
import prisma from "src/app/config/db";
import { logInUser } from "shared/apiShared";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  try {
    const body: IUserLogin = await req.json();
    const bodyType = new UserLoginPOST(body);
    const validation = await validate(bodyType);

    if (validation.length > 0) {
      throw onValidationError(validation);
    }

    const request = await prisma.user.findUnique({
      where: { email: body.email },
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

    if (!request)
      throw new CustomError({
        errors: [{ message: "User not found." }],
        msg: "User not found.",
        httpStatusCode: HttpStatusCode.NOT_FOUND,
      });

    if (!request.active)
      throw new CustomError({
        errors: [{ message: "User is not verified." }],
        msg: "User not verified.",
        httpStatusCode: HttpStatusCode.UNAUTHORIZED,
      });

    const isMatch = bcrypt.compareSync(body.password, request.password);
    if (!isMatch)
      throw new CustomError({
        errors: [{ message: "Password is wrong." }],
        msg: "Password mismatch.",
        httpStatusCode: HttpStatusCode.BAD_REQUEST,
      });

    const { password, ...removePassword } = request;
    const jwt = logInUser(removePassword);

    return onSuccessRequest({
      httpStatusCode: 200,
      data: { token: jwt, user: removePassword },
    });
  } catch (error: any) {
    return onThrowError(error);
  }
}
