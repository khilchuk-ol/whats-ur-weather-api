import axios from "axios";

import { parseUrl } from "../../../utils/url.utils.js";
import WeatherRequestHandler from "../abstr/weatherRequest.handler.js";

const DEFAULT_FIELDS = ["airTemperature", "humidity", "windSpeed"];

class StormglassHandler extends WeatherRequestHandler {
  constructor(reqData, resDataParser, handler) {
    this.reqData = reqData;
    this.resDataParser = resDataParser;
    this.getCoord = getCoord;
    this.handler = handler;
  }

  sendRequest = async (cityName) => {
    const [lat, lng] = await this.reqData.getCoord(cityName);

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

    let err = null;
    const data = await axios
      .get(url, {
        headers: {
          Authorization: this.reqData.apiKey,
        },
      })
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
  const curr = data.hours[0];

  return {
    windSpeed: curr.windSpeed.sg * 3.6,
    temperature: curr.airTemperature.sg,
    humidity: curr.humidity.sg,
  };
};

export default StormglassHandler;
