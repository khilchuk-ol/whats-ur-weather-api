import axios from "axios";

import { WeatherRes } from "./../weatherRequest.handler.interface.js";
import BasicWeatherData, {
  BasicWeatherParser,
} from "./../../basicWeatherData.interface.js";
import { parseUrl } from "../../../utils/url.utils.js";
import HandlerReqData from "../handlerReqData.interface.js";
import WeatherRequestHandler from "../weatherRequest.handler.interface.js";

class OpenweathermapHandler implements WeatherRequestHandler {
  reqData: HandlerReqData;
  resDataParser: BasicWeatherParser;
  handler: WeatherRequestHandler;

  constructor(
    reqData: HandlerReqData,
    resDataParser: BasicWeatherParser,
    handler: WeatherRequestHandler
  ) {
    this.reqData = reqData;
    this.resDataParser = resDataParser;
    this.handler = handler;
  }

  sendRequest = async (cityName: string) => {
    const requestValues = {
      APIkey: this.reqData.apiKey,
      cityName,
    };

    const url = parseUrl(this.reqData.url, requestValues);

    let err: Error = null;

    const data: BasicWeatherData = await axios
      .get(url)
      .then((resp) => this.resDataParser(Object(resp.data)))
      .catch((error) => {
        err = error;
        return null;
      });

    const res: WeatherRes = [data, err];

    return err && this.handler ? this.handler.sendRequest(cityName) : res;
  };
}

export function basicDataParser(data: object | unknown): BasicWeatherData {
  return {
    // @ts-ignore: Unreachable code error
    windSpeed: data.wind.speed,
    // @ts-ignore: Unreachable code error
    temperature: data.main.temp,
    // @ts-ignore: Unreachable code error
    humidity: data.main.humidity,
  };
}

export default OpenweathermapHandler;
