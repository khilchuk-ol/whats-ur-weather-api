import express from "express";
import WeatherController from "../controllers/weather.controller";

const api = express.Router();
let weatherController: WeatherController = null;

api.prototype.setController = (controller: WeatherController): void => {
  weatherController = controller;
};

api.get("/", (req, res) => {
  res.send({
    message: "Welcome to 'What's Ur Weather' weather api section",
  });
});

api.get("/current", weatherController.getCurrentWeather);

export default api;
