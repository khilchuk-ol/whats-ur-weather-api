import express from "express";

import WeatherController from "../controllers/weather.controller.js";
import chain from "../../domain/setupChain.js";

const controller = new WeatherController(chain);
const api = express.Router();

api.get("/", (req, res) => {
  res.send({
    message: "Welcome to 'What's Ur Weather' weather api section",
  });
});

api.get("/current", controller.getCurrentWeather);

export default api;
