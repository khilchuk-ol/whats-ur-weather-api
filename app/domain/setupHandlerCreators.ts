import HandlersFactoryFuncsCollection from "./weather-req-chain/handlers-factory-funcs-collection/impl/handlersFactoryFuncs.collection.js";
import OpenweathermapHandler, {
  basicDataParser as owmParser,
} from "./weather-req-chain/handlers/impl/openweathermap.handler.js";
import StormglassHandler, {
  basicDataParser as sgParser,
} from "./weather-req-chain/handlers/impl/stormglass.handler.js";
import TomorrowHandler, {
  basicDataParser as tmrwParser,
} from "./weather-req-chain/handlers/impl/tomorrow.handler.js";
import WeatherapiHandler, {
  basicDataParser as wapiParser,
} from "./weather-req-chain/handlers/impl/weatherapi.handler.js";

const createHandlersCol = new HandlersFactoryFuncsCollection();

createHandlersCol.register("openweathermap", (data, handler) => {
  return new OpenweathermapHandler(data, owmParser, handler);
});

createHandlersCol.register("stormglass", (data, handler) => {
  return new StormglassHandler(data, sgParser, handler);
});

createHandlersCol.register("tomorrow", (data, handler) => {
  return new TomorrowHandler(data, tmrwParser, handler);
});

createHandlersCol.register("weatherapi", (data, handler) => {
  return new WeatherapiHandler(data, wapiParser, handler);
});

export default createHandlersCol;
