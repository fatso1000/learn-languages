import { validate } from "class-validator";
import { NextResponse } from "next/server";
import { CustomError, IUserLogin, UserLoginPOST } from "types/apiTypes";
import {
  generateSuccessMessage,
  onThrowError,
  onValidationError,
} from "../../apiService";
import { HttpStatusCode } from "types/httpStatusCode";
import prisma from "src/app/config/db";
import { logInUser } from "shared/apiShared";
import bcrypt from "bcrypt";

export async function POST(req: Request, res: Response) {
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

    const isMatch = bcrypt.compareSync(body.password, request.password);
    if (!isMatch)
      throw new CustomError({
        msg: "Password mismatch.",
        httpStatusCode: HttpStatusCode.BAD_REQUEST,
      });

    const { password, ...removePassword } = request;
    const jwt = logInUser(removePassword);

    return NextResponse.json(
      generateSuccessMessage({
        httpStatusCode: HttpStatusCode.OK,
        data: { token: jwt, user: removePassword },
        message: "User logged in successfully.",
      }),
      { status: HttpStatusCode.OK }
    );
  } catch (error: any) {
    return onThrowError(error);
  }
}
