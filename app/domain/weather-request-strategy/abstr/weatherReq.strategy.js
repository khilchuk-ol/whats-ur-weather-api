import InvalidUrlException from "../../exceptions/invalidUrl.exception.js";

class WeatherRequestSenderStrategy {
  constructor(name, apiUrl, apiKey) {
    this.name = name;
    this.url = apiUrl;
    this.key = apiKey;
  }

  async sendRequest(cityName) {}

  _parseUrl = (urlValues) => {
    const apiUrl = this.url;

    if (!apiUrl) {
      throw new InvalidUrlException("API url cannot be empty", this);
    }

    for (let key in urlValues) {
      apiUrl.replace(`{${key}}`, urlValues[key]);
    }

    return apiUrl;
  };
}

export default WeatherRequestSenderStrategy;
