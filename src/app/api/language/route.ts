import { validate } from "class-validator";
import { NextRequest, NextResponse } from "next/server";
import prisma from "src/app/config/db";
import { CustomError, ILanguage, LanguagePOST } from "src/types/apiTypes";
import { HttpStatusCode } from "src/types/httpStatusCode";
import { onThrowError } from "../apiService";

export async function POST(req: NextRequest) {
  try {
    // verifyUserAuth(req);
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

export async function GET() {
  try {
    const request = await prisma.languages.findMany();
    return NextResponse.json({ request });
  } catch (error) {
    return onThrowError(error);
  }
}
