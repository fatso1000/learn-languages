import { validate } from "class-validator";
import { NextRequest, NextResponse } from "next/server";
import { CustomError, IUserSignUp, UserSignUpPOST } from "types/apiTypes";
import { onThrowError } from "../../apiService";
import { HttpStatusCode } from "types/httpStatusCode";
import prisma from "src/app/config/db";
import bcrypt from "bcrypt";
import { getRandomAnimalName, getRandomColor } from "src/shared/helpers";

export async function POST(req: NextRequest) {
  try {
    // verifyUserAuth(req);
    let body: IUserSignUp = await req.json();
    const bodyType = new UserSignUpPOST(body);
    const validation = await validate(bodyType);

    const randomAnimal = getRandomAnimalName();
    const randomColor = getRandomColor();

    if (validation.length > 0) {
      throw new CustomError({
        errors: validation,
        msg: "Error during data validation.",
        httpStatusCode: HttpStatusCode.BAD_REQUEST,
      });
    }

    body.password = await bcrypt.hash(body.password, 8);
    const name = body.name ? body.name : randomAnimal;

    const request = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name,
        UserContent: { create: { content: { connect: [] } } },
        profile: {
          create: {
            color: randomColor,
            animal_name: randomAnimal,
            languages: {
              create: {
                active: true,
                details: { connect: { id: +body.language + 1 } },
              },
            },
          },
        },
        rank: {
          create: {
            user_experience: 0,
            rank: { connect: { id: 1 } },
            updated_at: new Date(),
          },
        },
      },
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
