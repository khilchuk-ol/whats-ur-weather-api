import axios from "axios";

import { parseUrl } from "../../../utils/url.utils.js";
import WeatherRequestHandler from "../abstr/weatherRequest.handler.js";

class OpenweathermapHandler extends WeatherRequestHandler {
  constructor(reqData, resDataParser, handler) {
    super();

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

    const data = await axios
      .get(url)
      .then((res) => {
        const l = 0;
        return this.resDataParser(res.data);
      })
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
