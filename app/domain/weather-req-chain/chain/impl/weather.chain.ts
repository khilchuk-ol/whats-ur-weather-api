import { ApiData } from "./../../../config-reader/configData.interface.js";
import WeatherChainAbstr from "../weather.chain.interface.js";
import CoordinatesStrategy from "../../../coord-strategy/coord.strategy.interface.js";
import HandlersFactoryFuncsCollectionAbstr from "../../handlers-factory-funcs-collection/handlersFactoryFuncs.collection.interface.js";
import WeatherRequestHandler, {
  WeatherRes,
} from "../../handlers/weatherRequest.handler.interface.js";

class WeatherChain implements WeatherChainAbstr {
  creationalFuncs: HandlersFactoryFuncsCollectionAbstr;
  coordStrategy: CoordinatesStrategy;
  chainHead: WeatherRequestHandler;

  constructor(
    creationalFuncsCollection: HandlersFactoryFuncsCollectionAbstr,
    coordStrategy: CoordinatesStrategy
  ) {
    this.creationalFuncs = creationalFuncsCollection;
    this.coordStrategy = coordStrategy;

    this.chainHead = null;
  }

  initializeChain = (data: ApiData[], maxPriority: number) => {
    const handlersData = data
      .filter((o) => o.priority <= maxPriority)
      .sort((a, b) => b.priority - a.priority)
      .map((o) => {
        return {
          name: o.name,
          apiKey: o.key,
          url: o.api_url,
          getCoord: this.coordStrategy.getCoordinates,
        };
      });

    for (const handlerData of handlersData) {
      this.chainHead = this.creationalFuncs.getFunc(handlerData.name)(
        handlerData,
        this.chainHead
      );
    }
  };

  getWeather = async (cityName: string) => {
    if (!cityName.trim()) {
      const res: WeatherRes = [null, new Error("city name cannot be empty!")];

      return res;
    }

    return this.chainHead.sendRequest(cityName);
  };
}

export default WeatherChain;
