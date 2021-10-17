import WeatherChainAbstr from "../abstr/weather.chain.abstr.js";

class WeatherChain extends WeatherChainAbstr {
  constructor(creationalFuncsCollection, coordStrategy) {
    super();

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
          apiKey: o.key,
          url: o.api_url,
          getCoord: this.coordStrategy.getCoordinates,
        };
      });

    for (let data of handlersData) {
      this.chain = this.creationalFuncs.getFunc(data.name)(data, this.chain);
    }
  };

  getWeather = async (cityName) => {
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

export default WeatherChain;
