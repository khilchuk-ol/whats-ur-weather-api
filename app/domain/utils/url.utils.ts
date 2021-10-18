import InvalidUrlException from "../exceptions/invalidUrl.exception.js";

export const parseUrl = (url: string, urlValues: any) => {
  let apiUrl = (" " + url).slice(1);

  if (!apiUrl) {
    throw new InvalidUrlException("url cannot be empty", this);
  }

  for (const key in urlValues) {
    if (urlValues.hasOwnProperty(key)) {
      apiUrl = apiUrl.replace(`{${key}}`, urlValues[key]);
    }
  }

  return apiUrl;
};
