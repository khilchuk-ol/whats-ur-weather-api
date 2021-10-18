import axios from "axios";

import { WeatherRes } from "./../weatherRequest.handler.interface.js";
import { parseUrl } from "../../../utils/url.utils.js";
import BasicWeatherData, {
  BasicWeatherParser,
} from "../../basicWeatherData.interface.js";
import HandlerReqData from "../handlerReqData.interface.js";
import WeatherRequestHandler from "../weatherRequest.handler.interface.js";
import { Coordinates } from "./../../../coord-strategy/coordRes.interface.js";

const DEFAULT_FIELDS = ["airTemperature", "humidity", "windSpeed"];

class StormglassHandler implements WeatherRequestHandler {
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
    const coordRes = await this.reqData.getCoord(cityName);
    let res: WeatherRes;

    if (coordRes instanceof Error) {
      res = [null, coordRes];
      return res;
    }

    const { lat, lng } = coordRes as Coordinates;

    const curTime = new Date();
    const laterTime = { ...curTime };
    laterTime.setHours(laterTime.getHours() + 1);

    const fields = this.reqData.fields ?? DEFAULT_FIELDS;

    const requestValues = {
      lat,
      lng,
      fieldsArray: fields.join(),
      startTimeInISO: curTime.toISOString(),
      endTimeInISO: laterTime.toISOString(),
    };

    const url = parseUrl(this.reqData.url, requestValues);

    let err: Error = null;

    const data: BasicWeatherData = await axios
      .get(url, {
        headers: {
          Authorization: this.reqData.apiKey,
        },
      })
      .then((resp) => this.resDataParser(Object(resp.data)))
      .catch((error) => {
        err = error;
        return null;
      });

    res = [data, err];

    return err && this.handler ? this.handler.sendRequest(cityName) : res;
  };
}

export function basicDataParser(data: object): BasicWeatherData {
  // @ts-ignore: Unreachable code error
  const curr = data.hours[0];

  return {
    windSpeed: curr.windSpeed.sg * 3.6,
    temperature: curr.airTemperature.sg,
    humidity: curr.humidity.sg,
  };
}

export default StormglassHandler;
