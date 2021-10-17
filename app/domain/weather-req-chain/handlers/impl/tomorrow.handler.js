import { parseUrl } from "../../../utils/url.utils.js";
import WeatherRequestHandler from "../abstr/weatherRequest.handler.js";

const DEFAULT_FIELDS = ["temperature", "humidity", "windSpeed"];

class TomorrowHandler extends WeatherRequestHandler {
  constructor(
    reqData,
    resDataParser,
    getCoord = (cityName) => [0, 0],
    handler
  ) {
    this.reqData = reqData;
    this.resDataParser = resDataParser;
    this.getCoord = getCoord;
    this.handler = handler;
  }
  sendRequest = async (cityName) => {
    const [lat, lng] = this.getCoord(cityName);

    const curTime = new Date();
    const laterTime = { ...curTime };
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
  const curr = data.data.timelines[0].intervals[0];

  return {
    windSpeed: curr.windSpeed,
    temperature: curr.temperature,
    humidity: curr.humidity,
  };
};

export default TomorrowHandler;
