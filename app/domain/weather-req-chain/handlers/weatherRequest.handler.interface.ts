import BasicWeatherData from "../basicWeatherData.interface.js";

export type WeatherRes = [BasicWeatherData | null, Error | null];

interface WeatherRequestHandler {
  sendRequest(cityName: string): Promise<WeatherRes>;
}

export default WeatherRequestHandler;
