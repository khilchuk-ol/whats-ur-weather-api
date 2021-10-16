import express from "express";

import controller from "../controllers/weather.controller.js";

const api = express.Router();

api.get("/", (req, res) => {
  res.send({
    message: "Welcome to 'What's Ur Weather' weather api section",
  });
});

api.get("/current", controller.getCurrentWeather);

export default api;
