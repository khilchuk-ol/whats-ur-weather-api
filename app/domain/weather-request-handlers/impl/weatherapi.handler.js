import { parseUrl } from "../../utils/url.utils";
import WeatherRequestHandler from "../abstr/weatherRequest.handler.js";

class WeatherapiHandler extends WeatherRequestHandler {
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

    const url = parseUrl(this.reqData.url, requestValues);

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
    windSpeed: data.current.wind_kph,
    temperature: data.current.temp_c,
    humidity: data.current.humidity,
  };
};

export default WeatherapiHandler;
