import { parseUrl } from "../../utils/url.utils";
import WeatherRequestHandler from "../abstr/weatherRequest.handler";

class OpenweathermapHandler extends WeatherRequestHandler {
  constructor(reqData, resDataParser, handler) {
    this.reqData = reqData;
    this.resDataParser = resDataParser;
    this.handler = handler;
  }

  sendRequest = async (cityName) => {
    const requestValues = {
      APIkey: this.reqData.apiKey,
      cityName: cityName,
    };

    const url = parseUrl(requestValues);

    let err = null;
    const data = await fetch(url)
      .then((res) => res.json())
      .then((data) => this.resDataParser(data))
      .catch((error) => {
        err = error;
      });

    return err && this.handler
      ? this.handler.sendRequest(cityName)
      : [data, err];
  };
}

export const basicDataParser = (data) => {
  return {
    windSpeed: data.wind.speed,
    temperature: data.main.temp,
    humidity: data.main.humidity,
  };
};

export default OpenweathermapHandler;
