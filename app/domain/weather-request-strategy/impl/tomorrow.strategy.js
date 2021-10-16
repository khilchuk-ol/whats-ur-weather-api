import WeatherRequestSenderStrategy from "../abstr/weatherReq.strategy.js";

class TomorrowStrategy extends WeatherRequestSenderStrategy {
  constructor(
    name,
    apiUrl,
    apiKey,
    resDataParser,
    getCoord = (cityName) => [0, 0]
  ) {
    super(name, apiUrl, apiKey);
    this.resDataParser = resDataParser;
    this.getCoord = getCoord;
  }

  sendRequest = async (
    cityName,
    fieldsArr = ["temperature", "humidity", "windSpeed"]
  ) => {
    const [lat, lng] = this.getCoord(cityName);

    const curTime = new Date();
    const laterTime = { ...curTime };
    laterTime.setHours(laterTime.getHours() + 1);

    const requestValues = {
      APIkey: this.apiKey,
      lat,
      lng,
      fieldsArray: fieldsArr.join(),
      startTimeInISO: curTime.toISOString(),
      endTimeInISO: laterTime.toISOString(),
    };

    const url = this._parseUrl(requestValues);

    return await fetch(url)
      .then((res) => res.json())
      .then((data) => this.resDataParser(data));
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

export default TomorrowStrategy;
