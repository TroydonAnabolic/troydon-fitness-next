// Function to create a URL with query parameters
export const createUrlWithParams = (
  baseUrl: string,
  queryParams: any
): string => {
  const url = new URL(baseUrl);

  // Append query parameters to the URL
  Object.keys(queryParams).forEach((key) => {
    url.searchParams.append(key, queryParams[key]);
  });

  return url.toString();
};
