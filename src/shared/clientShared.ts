import { HttpStatusCode } from "src/types/httpStatusCode";

const handleApiRequest = async <T = any>(request: string) => {
  try {
    const fetching = await fetch(request, {
      next: { revalidate: 0 },
    });
    const petition = await fetching.json();
    return { error: undefined, data: petition.data as T };
  } catch (error) {
    return { error: error, data: undefined };
  }
};

const handleCustomApiRequest = async <T = any>(
  request: string,
  method: "POST" | "GET" | "PATCH",
  body: any
) => {
  try {
    const fetching = await fetch(request, {
      method,
      body: JSON.stringify(body),
      next: { revalidate: 0 },
    });
    const petition = await fetching.json(),
      statusCode = fetching.status;

    return handleStatusCode<T>(statusCode, petition);
    // return { error: undefined, data: petition.data as T };
  } catch (error: any) {
    return { errors: error, message: "Unknown error", data: undefined };
  }
};

const handleStatusCode = <T>(statusCode: HttpStatusCode, petition: any) => {
  switch (statusCode) {
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

export { handleApiRequest, randomKey, handleCustomApiRequest };
