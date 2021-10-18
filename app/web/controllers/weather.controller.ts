import { Request, Response } from "express";

import WeatherChainAbstr from "../../domain/weather-req-chain/chain/weather.chain.interface.js";

class WeatherController {
  chain: WeatherChainAbstr;

  constructor(requestChain: WeatherChainAbstr) {
    this.chain = requestChain;
  }

  getCurrentWeather = async (req: Request, res: Response) => {
    const cityName = req.query.city.toString();

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
