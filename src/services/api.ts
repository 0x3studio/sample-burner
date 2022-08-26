import useSWR from "swr";

export class ApiError extends Error {
  constructor(public readonly url: string, public readonly response: Response) {
    super(`Got ${response.status} while calling the ${url} endpoint`);
  }
}

export enum Method {
  GET = "GET",
  POST = "POST",
}

const buildUrl = (endpoint: string) =>
  `/api/${endpoint.replace(/^\/|\/$/g, "")}`;

const buildFetcher = (method: Method) => {
  return async (url: string) => {
    const response = await fetch(url, { method });
    if (!response.ok) {
      throw new ApiError(url, response);
    }
    return await response.json();
  };
};

export const useApi = <T>(endpoint: string, method: Method = Method.GET) => {
  return useSWR<T>(buildUrl(endpoint), buildFetcher(method), {
    revalidateOnFocus: false,
  });
};
