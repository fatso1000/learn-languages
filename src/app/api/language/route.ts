import { validate } from "class-validator";
import { NextRequest } from "next/server";
import prisma from "src/app/config/db";
import { CustomError, ILanguage, LanguagePOST } from "src/types/apiTypes";
import { HttpStatusCode } from "src/types/httpStatusCode";
import { onSuccessRequest, onThrowError } from "../apiService";
import { verifyUserAuth } from "src/shared/apiShared";

export async function POST(req: NextRequest) {
  try {
    verifyUserAuth(req);
    let body: ILanguage = await req.json();
    const bodyType = new LanguagePOST(body);

    const validation = await validate(bodyType);
    if (validation.length > 0) {
      throw new CustomError({
        errors: validation,
        msg: "Error during data validation.",
        httpStatusCode: HttpStatusCode.BAD_REQUEST,
      });
    }

    const request = await prisma.languages.create({
      data: {
        name: body.name,
        short_name: body.short_name,
      },
    });
    if (!request)
      throw new CustomError({
        httpStatusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
        msg: "Unexpected error during user registration.",
      });

    return onSuccessRequest({ data: request, httpStatusCode: 200 });
  } catch (error: any) {
    return onThrowError(error);
  }
}

export async function GET() {
  try {
    const request = await prisma.languages.findMany();
    return onSuccessRequest({ data: request, httpStatusCode: 200 });
  } catch (error) {
    return onThrowError(error);
  }
}
