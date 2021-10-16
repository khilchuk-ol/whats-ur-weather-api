import WeatherRequestSenderStrategy from "../abstr/weatherReqStrategy.js";

class OpenweathermapStrategy extends WeatherRequestSenderStrategy {
  constructor(name, apiUrl, apiKey, resDataParser) {
    super(name, apiUrl, apiKey);
    this.resDataParser = resDataParser;
  }

  sendRequest = async (cityName) => {
    const requestValues = {
      APIkey: this.apiKey,
      cityName: cityName,
    };

    const url = this._parseUrl(requestValues);

    return await fetch(url)
      .then((res) => res.json())
      .then((data) => this.resDataParser(data));
  };
}

export const basicDataParser = (data) => {
  return {
    windSpeed: data.wind.speed,
    temperature: data.main.temp,
    humidity: data.main.humidity,
  };
};

export default OpenweathermapStrategy;
