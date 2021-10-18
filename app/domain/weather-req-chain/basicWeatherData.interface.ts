interface BasicWeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
}

export type BasicWeatherParser = (data: object) => BasicWeatherData;

export default BasicWeatherData;
