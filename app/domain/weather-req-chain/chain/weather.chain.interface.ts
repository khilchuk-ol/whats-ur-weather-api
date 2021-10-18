import { ApiData } from "./../../config-reader/configData.interface.js";
import { WeatherRes } from "../handlers/weatherRequest.handler.interface.js";

interface WeatherChainAbstr {
  initializeChain(data: ApiData[], maxPriority: number): void;

  getWeather(cityName: string): Promise<WeatherRes>;
}

export default WeatherChainAbstr;
