import { NextResponse } from "next/server";
import { CustomError, IUserLogout } from "types/apiTypes";
import { onThrowError } from "../../apiService";
import { HttpStatusCode } from "types/httpStatusCode";
import jwt from "jsonwebtoken";

export async function GET(req: Request) {
  try {
    const jwt_token = req.headers.get("token");
    if (!jwt_token)
      return new CustomError({
        httpStatusCode: HttpStatusCode.UNAUTHORIZED,
        msg: "Missing token",
      });
    const jwt_secret = process.env.JWT_SECRET_KEY || "";
    console.log(jwt_token, jwt_secret)
    const isVerified = jwt.verify(jwt_token, jwt_secret);

    if (!isVerified) {
      throw new CustomError({
        httpStatusCode: HttpStatusCode.UNAUTHORIZED,
        msg: "Token is not valid",
      });
    }



    // if (!request)
    //   throw new CustomError({
    //     httpStatusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
    //     msg: "Unexpected error during user registration.",
    //   });

    return NextResponse.json({ message: "User logged out" });
  } catch (error: any) {
    console.error(error)
    return onThrowError(error);
  }
}
