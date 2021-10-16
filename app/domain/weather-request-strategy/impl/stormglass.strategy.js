import WeatherRequestSenderStrategy from "../abstr/weatherReq.strategy.js";

class StormglassStrategy extends WeatherRequestSenderStrategy {
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
    fieldsArr = ["airTemperature", "humidity", "windSpeed"]
  ) => {
    const [lat, lng] = this.getCoord(cityName);

    const curTime = new Date();
    const laterTime = { ...curTime };
    laterTime.setHours(laterTime.getHours() + 1);

    const requestValues = {
      lat,
      lng,
      fieldsArray: fieldsArr.join(),
      startTimeInISO: curTime,
      endTimeInISO: laterTime,
    };

    const url = this._parseUrl(requestValues);

    return await fetch(url, {
      headers: {
        Authorization: this.key,
      },
    })
      .then((res) => res.json())
      .then((data) => this.resDataParser(data));
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

export default StormglassStrategy;
