export const parseUrl = (url, urlValues) => {
  const apiUrl = (" " + url).slice(1);

  if (!apiUrl) {
    throw new InvalidUrlException("url cannot be empty", this);
  }

  for (let key in urlValues) {
    apiUrl.replace(`{${key}}`, urlValues[key]);
  }

  return apiUrl;
};
