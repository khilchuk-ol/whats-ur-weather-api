import WeatherChain from "../abstr/weather.chain.js";

class MainWeatherChain extends WeatherChain {
  constructor(creationalFuncsCollection, coordStrategy) {
    this.creationalFuncs = creationalFuncsCollection;
    this.coordStrategy = coordStrategy;

    this.chain = null;
  }

  initializeChain = (data, maxPriority) => {
    const handlersData = data
      .filter((o) => o.priority <= maxPriority)
      .sort((a, b) => b.priority - a.priority)
      .map((o) => {
        return {
          name: o.name,
          reqData: {
            apiKey: o.key,
            url: o.api_url,
          },
          getCoord: this.coordStrategy.getCoordinates,
        };
      });

    for (let data of handlersData) {
      chain = this.creationalFuncs.getFunc(data.name)(data, chain);
    }
  };

  sendRequest = (cityName) => {
    if (!cityName.trim()) {
      return [
        null,
        {
          message: "city name cannot be empty!",
        },
      ];
    }

    return this.chain.sendRequest(cityName);
  };
}

export default MainWeatherChain;
