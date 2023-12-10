import { validate } from "class-validator";
import { NextResponse } from "next/server";
import { CustomError } from "types/apiTypes";
import {
  generateSuccessMessage,
  onThrowError,
  onValidationError,
} from "../../apiService";
import { HttpStatusCode } from "types/httpStatusCode";
import prisma from "src/app/config/db";

export async function PATCH(req: Request, res: Response) {
  try {
    const body = await req.json();
    // const bodyType = new UserLoginPOST(body);
    // const validation = await validate(bodyType);

    // if (validation.length > 0) {
    //   throw onValidationError(validation);
    // }

    const request = await prisma.user.update({
      data: { name: body.name },
      where: { id: body.id },
    });
    if (!request)
      throw new CustomError({
        errors: [],
        msg: "User not found.",
        httpStatusCode: HttpStatusCode.NOT_FOUND,
      });

    return NextResponse.json(
      generateSuccessMessage({
        httpStatusCode: HttpStatusCode.OK,
        data: { user: request },
        message: "User logged in successfully.",
      }),
      { status: HttpStatusCode.OK }
    );
  } catch (error: any) {
    return onThrowError(error);
  }
}
