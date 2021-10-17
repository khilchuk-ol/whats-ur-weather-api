import WeatherChain from "./weather-req-chain/chain/impl/weather.chain.js";
import GoogleStrategy from "./coord-strategy/impl/google.strategy.js";
import JsonConfigReader from "./config-reader/impl/json.configReader.js";
import funcCol from "./setupHandlerCreators.js";

const configReader = new JsonConfigReader("api-providers.conf.json");
const data = await configReader.readAllData();

const coordStrategy = new GoogleStrategy(data.geo[0]);

const chain = new WeatherChain(funcCol, coordStrategy);
chain.initializeChain(data.weather, 1);

export default chain;
