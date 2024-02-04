import { validate } from "class-validator";
import { NextRequest } from "next/server";
import { CustomError, IUser, UserPATCH } from "types/apiTypes";
import {
  onSuccessRequest,
  onThrowError,
  onValidationError,
} from "../../../apiService";
import { HttpStatusCode } from "types/httpStatusCode";
import prisma from "src/app/config/db";
import { verifyUserAuth } from "src/shared/apiShared";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  try {
    verifyUserAuth(req);
    const id = Number(params.id);
    const body: IUser = await req.json();
    const bodyType = new UserPATCH(body);
    const validation = await validate(bodyType);

    if (!id)
      throw new CustomError({
        errors: [],
        httpStatusCode: HttpStatusCode.BAD_REQUEST,
        msg: "Error parsing request id.",
      });

    if (validation.length > 0) {
      throw onValidationError(validation);
    }

    const request = await prisma.user.update({
      data: {
        name: body.name,
        biography: body.biography,
        ubication: body.ubication,
        profile: {
          upsert: {
            create: {
              animal_name: body.profile?.animal_name || "",
              color: body.profile?.color || "",
            },
            update: {
              animal_name: body.profile?.animal_name,
              color: body.profile?.color,
            },
          },
        },
      },
      where: { id: id },
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
    return onSuccessRequest({
      httpStatusCode: HttpStatusCode.OK,
      data: { user: request },
      message: "User logged in successfully.",
    });
  } catch (error: any) {
    console.log(error);
    return onThrowError(error);
  }
}
