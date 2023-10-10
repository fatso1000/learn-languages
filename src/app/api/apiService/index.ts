import { ValidationError } from "class-validator";
import { NextResponse } from "next/server";
import { CustomError } from "src/types/apiTypes";
import { HttpStatusCode } from "types/httpStatusCode";

const validateOrReject = async (input: any) => {};

const generateErrorMessage = <E = any>({
  httpStatusCode,
  errors,
  message,
}: {
  httpStatusCode: HttpStatusCode;
  errors: E | E[];
  message?: string;
}) => {
  return {
    httpStatusCode,
    errors,
    message,
  };
};

const generateSuccessMessage = <E = any>({
  httpStatusCode,
  data,
  message,
}: {
  httpStatusCode: HttpStatusCode;
  data: E | E[];
  message?: string;
}) => {
  return {
    httpStatusCode,
    data,
    message,
  };
};

const onValidationError = (validation: ValidationError[]) => {
  return new CustomError({
    msg: "Error during data validation.",
    errors: validation,
    httpStatusCode: HttpStatusCode.BAD_REQUEST,
  });
};

const onThrowError = (error: any) => {
  if (error instanceof CustomError)
    return NextResponse.json(
      generateErrorMessage({
        httpStatusCode: error.errorData.httpStatusCode,
        errors: error.errorData.errors,
        message: error.errorData.message,
      }),
      { status: error.errorData.httpStatusCode }
    );

  return NextResponse.json(
    generateErrorMessage({
      httpStatusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
      errors: [{ message: error.message }],
      message: "Unexpected error.",
    }),
    { status: 500 }
  );
};

export {
  validateOrReject,
  generateErrorMessage,
  onThrowError,
  onValidationError,
  generateSuccessMessage,
};
