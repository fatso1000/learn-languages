import { validate } from "class-validator";
import { NextRequest, NextResponse } from "next/server";
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

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body: IUserLogin = await req.json();
    const bodyType = new UserLoginPOST(body);
    const validation = await validate(bodyType);

    if (validation.length > 0) {
      throw onValidationError(validation);
    }

    const request = await prisma.user.findFirst({
      where: { email: body.email },
      include: {
        profile: { include: { languages: { include: { details: true } } } },
        rank: { include: { rank: true } },
      },
    });

    if (!request)
      throw new CustomError({
        errors: [],
        msg: "User not found.",
        httpStatusCode: HttpStatusCode.NOT_FOUND,
      });

    if (!request?.active)
      throw new CustomError({
        errors: [],
        msg: "User not verified.",
        httpStatusCode: HttpStatusCode.UNAUTHORIZED,
      });

    const isMatch = bcrypt.compareSync(body.password, request.password);
    if (!isMatch)
      throw new CustomError({
        msg: "Password mismatch.",
        httpStatusCode: HttpStatusCode.BAD_REQUEST,
      });

    const { password, ...removePassword } = request;
    const jwt = logInUser(removePassword);

    return onSuccessRequest({
      httpStatusCode: HttpStatusCode.CREATED,
      data: { token: jwt, user: removePassword },
    });
  } catch (error: any) {
    return onThrowError(error);
  }
}
