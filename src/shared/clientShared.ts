import { HttpStatusCode } from "src/types/httpStatusCode";

const revalidate = 60;

const handleApiRequest = async <T = any>(request: string) => {
  try {
    const fetching = await fetch(request, {
      next: { revalidate },
    });
    const petition = await fetching.json();
    return { error: undefined, data: petition.data as T };
  } catch (error) {
    return { error: error, data: undefined };
  }
};

const handleCustomApiRequest = async <T = any>(
  request: string,
  method: "POST" | "GET",
  body: any
) => {
  try {
    const fetching = await fetch(request, {
      method,
      body: JSON.stringify(body),
      next: { revalidate },
    });
    const petition = await fetching.json();
    return handleStatusCode(petition.httpStatusCode, petition);
    // return { error: undefined, data: petition.data as T };
  } catch (error) {
    return { error: error, data: undefined };
  }
};

const handleStatusCode = (statusCode: HttpStatusCode, petition: any) => {
  switch (statusCode) {
    case HttpStatusCode.OK:
      return { error: undefined, data: petition.data };

    default:
      return { error: petition.message, data: undefined };
  }
};

const randomKey = () =>
  new Date(new Date().valueOf() - Math.random() * 1e12).toString();

export { handleApiRequest, randomKey, handleCustomApiRequest };
