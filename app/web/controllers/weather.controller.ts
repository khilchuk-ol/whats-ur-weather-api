import { Request, Response } from "express";

import WeatherChainAbstr from "../../domain/weather-req-chain/chain/weather.chain.interface.js";
import Logger from "../../logger/logger.interface.js";
import Analyser from "../../analyser/analyser.interface.js";

const isCityValid = (city: string): boolean => {
  const alphaEngl = /^[A-Za-z - ]$/;

  return city.trim() && alphaEngl.test(city);
};

class WeatherController {
  chain: WeatherChainAbstr;
  logger: Logger;
  analyser: Analyser;

  constructor(
    requestChain: WeatherChainAbstr,
    logger: Logger,
    analyser: Analyser
  ) {
    this.chain = requestChain;
    this.logger = logger;
    this.analyser = analyser;
  }

  getCurrentWeather = async (req: Request, res: Response) => {
    const cityName = req.query.city.toString().trim();

    if (!isCityValid(cityName)) {
      res.status(200).send({ message: "Invalid city name provided" });
      return;
    }

    this.logger.log(`Current weather request made for city=${cityName}.
                     URL: ${req.url}`);

    this.analyser.incrementCityCount(cityName);

    const [data, err] = await this.chain.getWeather(cityName);

    if (err || !data) {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Post.",
      });

      return;
    }

    res.send(data);
  };
}

export default WeatherController;
