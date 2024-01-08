import { validate } from "class-validator";
import { NextRequest, NextResponse } from "next/server";
import prisma from "src/app/config/db";
import { CustomError, IRank, RankPOST } from "src/types/apiTypes";
import { HttpStatusCode } from "src/types/httpStatusCode";
import { onThrowError } from "../apiService";

export async function POST(req: NextRequest) {
  try {
    let body: IRank = await req.json();
    const bodyType = new RankPOST(body);

    const validation = await validate(bodyType);

    if (validation.length > 0) {
      throw new CustomError({
        errors: validation,
        msg: "Error during data validation.",
        httpStatusCode: HttpStatusCode.BAD_REQUEST,
      });
    }

    const request = await prisma.ranks.create({
      data: {
        name: body.name,
        distintive: body.distintive,
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
