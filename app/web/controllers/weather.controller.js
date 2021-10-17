class WeatherController {
  constructor(requestChain) {
    this.chain = requestChain;
  }

  getCurrentWeather = async (req, res) => {
    const cityName = req.query.city;

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
