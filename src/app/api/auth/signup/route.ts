import { validate } from "class-validator";
import { NextRequest, NextResponse } from "next/server";
import { CustomError, IUserSignUp, UserSignUpPOST } from "types/apiTypes";
import { onThrowError } from "../../apiService";
import { HttpStatusCode } from "types/httpStatusCode";
import prisma from "src/app/config/db";
import bcrypt from "bcrypt";
import { getRandomAnimalName } from "src/shared/helpers";

export async function POST(req: NextRequest) {
  try {
    // verifyUserAuth(req);
    let body: IUserSignUp = await req.json();
    const bodyType = new UserSignUpPOST(body);

    const validation = await validate(bodyType);
    if (validation.length > 0) {
      throw new CustomError({
        errors: validation,
        msg: "Error during data validation.",
        httpStatusCode: HttpStatusCode.BAD_REQUEST,
      });
    }

    body.password = await bcrypt.hash(body.password, 8);
    const name = body.name ? body.name : getRandomAnimalName();

    const fullBody = {
      email: body.email,
      password: body.password,
      name,
      user_readings: { create: { readings: { connect: [] } } },
      profile: { create: { color: body.profile_color } },
    };

    const request = await prisma.user.create({
      data: fullBody,
    });
    if (!request)
      throw new CustomError({
        httpStatusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
        msg: "Unexpected error during user registration.",
      });

    return NextResponse.json(request);
  } catch (error: any) {
    return onThrowError(error);
  }
}
