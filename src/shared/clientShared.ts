import { HttpStatusCode } from "src/types/httpStatusCode";
import { getBearerToken, logoutUser } from "./cookies";

const handleCustomApiRequest = async <T = any>(
  request: string,
  method: "POST" | "GET" | "PATCH",
  body: any = undefined,
  withToken: boolean = false
) => {
  try {
    let headers: any[] = [];

    if (withToken) {
      const { token } = await getBearerToken();
      headers = [["Authorization", `${token?.value}`]];
    }

    const fetching = await fetch(request, {
      method,
      body: body ? JSON.stringify(body) : undefined,
      next: { revalidate: 0 },
      headers,
    });

    const petition = await fetching.json(),
      statusCode = fetching.status;

    return handleStatusCode<T>(statusCode, petition);
  } catch (error: any) {
    return { errors: error, message: "Unknown error", data: undefined };
  }
};

const handleStatusCode = async <T>(
  statusCode: HttpStatusCode,
  petition: any
) => {
  switch (statusCode) {
    case HttpStatusCode.UNAUTHORIZED:
      await logoutUser();
      return { message: undefined, errors: [], data: undefined };
    case HttpStatusCode.OK:
      return { message: undefined, errors: [], data: petition.data as T };

    default:
      return {
        message: petition.message,
        errors: petition.errors,
        data: undefined,
      };
  }
};

const randomKey = () =>
  new Date(new Date().valueOf() - Math.random() * 1e12).toString();

export { randomKey, handleCustomApiRequest };
