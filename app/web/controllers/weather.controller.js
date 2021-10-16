const weatherMediator = {
  getWeather: async (cityName) => {
    return [{ cityName }, null];
  },
};

const getCurrentWeather = async (req, res) => {
  const cityName = req.query.city;

  const [data, err] = await weatherMediator.getWeather(cityName);

  if (err || !data) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Post.",
    });

    return;
  }

  res.send(data);
};

const services = {
  getCurrentWeather,
};

export default services;
