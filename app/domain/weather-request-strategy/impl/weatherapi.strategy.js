import WeatherRequestSenderStrategy from "../abstr/weatherReq.strategy.js";

class WeatherapiStrategy extends WeatherRequestSenderStrategy {
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
    windSpeed: data.current.wind_kph,
    temperature: data.current.temp_c,
    humidity: data.current.humidity,
  };
};

export default WeatherapiStrategy;