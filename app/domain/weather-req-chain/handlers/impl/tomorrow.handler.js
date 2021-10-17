import axios from "axios";

import { parseUrl } from "../../../utils/url.utils.js";
import WeatherRequestHandler from "../abstr/weatherRequest.handler.js";

const DEFAULT_FIELDS = ["temperature", "humidity", "windSpeed"];

class TomorrowHandler extends WeatherRequestHandler {
  constructor(reqData, resDataParser, handler) {
    super();

    this.reqData = reqData;
    this.resDataParser = resDataParser;
    this.handler = handler;
  }
  sendRequest = async (cityName) => {
    const [lat, lng] = await this.reqData.getCoord(cityName);

    const curTime = new Date();
    const laterTime = new Date();
    laterTime.setHours(laterTime.getHours() + 1);

    const fields = this.reqData.fields ?? DEFAULT_FIELDS;

    const requestValues = {
      APIkey: this.reqData.apiKey,
      lat,
      lng,
      fieldsArray: fields.join(),
      startTimeInISO: curTime.toISOString(),
      endTimeInISO: laterTime.toISOString(),
    };

    const url = parseUrl(this.reqData.url, requestValues);

    let err = null;
    const data = await axios
      .get(url)
      .then((res) => this.resDataParser(res.data))
      .catch((error) => {
        err = error;
      });

    return err && this.handler
      ? this.handler.sendRequest(cityName)
      : [data, err];
  };
}

export const basicDataParser = (data) => {
  const curr = data.data.timelines[0].intervals[0];

  return {
    windSpeed: curr.values.windSpeed,
    temperature: curr.values.temperature,
    humidity: curr.values.humidity,
  };
};

export default TomorrowHandler;
