import { validate } from "class-validator";
import { NextRequest } from "next/server";
import { CustomError, IUserSignUp, UserSignUpPOST } from "types/apiTypes";
import { onSuccessRequest, onThrowError } from "../../apiService";
import { HttpStatusCode } from "types/httpStatusCode";
import prisma from "src/app/config/db";
import bcrypt from "bcrypt";
import { getRandomAnimalName, getRandomColor } from "src/shared/helpers";

import { sendMail } from "src/shared/mailService";
import { logInUser } from "src/shared/apiShared";

export async function OPTIONS() {
  return onSuccessRequest({
    data: {},
    httpStatusCode: HttpStatusCode.OK,
  });
}

export async function POST(req: NextRequest) {
  try {
    let body: IUserSignUp = await req.json();
    const bodyType = new UserSignUpPOST(body);
    const validation = await validate(bodyType);

    const randomAnimal = getRandomAnimalName();
    const randomColor = getRandomColor();

    const token = logInUser(body);

    if (validation.length > 0)
      throw new CustomError({
        errors: validation,
        msg: "Error during data validation.",
        httpStatusCode: HttpStatusCode.BAD_REQUEST,
      });

    if (!token)
      throw new CustomError({
        errors: [{ message: "Error parsing token." }],
        httpStatusCode: HttpStatusCode.BAD_REQUEST,
        msg: "Error parsing token.",
      });

    const encodedToken = btoa(token);

    body.password = await bcrypt.hash(body.password, 8);
    const name = body.name ? body.name : randomAnimal;

    const stringify = body.language.split(",");
    const languageCombo = await prisma.languagesCombos.findFirst({
      where: {
        base_language: { name: stringify[0] },
        target_language: { path: ["name"], equals: stringify[1] },
      },
      include: {
        base_language: true,
      },
    });

    if (!languageCombo)
      throw new CustomError({
        httpStatusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
        errors: [{ message: "Cannot find language_combo" }],
        msg: "Cannot find LanguageCombo.",
      });

    const request = await prisma.user.create({
      data: {
        active: true,
        email: body.email,
        password: body.password,
        name,
        user_content: { create: { content: { connect: [] } } },
        profile: {
          create: {
            color: randomColor,
            animal_name: randomAnimal,
            languages: {
              create: {
                active: true,
                details: { connect: { id: languageCombo?.id } },
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
        user_courses: {
          create: {
            active: true,
            course: {
              connect: {
                languages_id: languageCombo?.id,
              },
            },
          },
        },
        lives_and_strikes: {
          create: {
            lives: 5,
          },
        },
      },
    });

    if (!request)
      throw new CustomError({
        httpStatusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
        errors: [{ message: "Unexpected error during user registration." }],
        msg: "Unexpected error during user registration.",
      });

    await sendMail(
      body.name,
      body.email,
      encodedToken,
      languageCombo!.base_language.short_name
    );

    return onSuccessRequest({
      data: request,
      httpStatusCode: HttpStatusCode.CREATED,
    });
  } catch (error) {
    return onThrowError(error);
  }
}
