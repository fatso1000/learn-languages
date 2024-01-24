import { NextRequest } from "next/server";
import { CustomError } from "types/apiTypes";
import { HttpStatusCode } from "types/httpStatusCode";
import prisma from "src/app/config/db";
import { onSuccessRequest, onThrowError } from "../../apiService";

function parseJwt(token: string) {
  if (!token) return;

  const base64Payload = token.split(".")[1];
  const payload = Buffer.from(base64Payload, "base64");

  return JSON.parse(payload.toString());
}

export async function PATCH(req: NextRequest) {
  try {
    const { token } = await req.json();

    if (!token)
      throw new CustomError({
        errors: [],
        httpStatusCode: HttpStatusCode.BAD_REQUEST,
        msg: "Error parsing request token.",
      });

    const { email } = parseJwt(token);

    const request = await prisma.user.update({
      where: { email: email },
      data: { active: true },
    });

    return onSuccessRequest({
      httpStatusCode: HttpStatusCode.OK,
      data: { user: request },
      message: "User verify is successfully.",
    });
  } catch (error: any) {
    return onThrowError(error);
  }
}
