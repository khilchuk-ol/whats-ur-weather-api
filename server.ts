import express from "express";
import cors from "cors";

import WeatherController from "./app/web/controllers/weather.controller.js";
import FileLogger from "./app/logger/impl/fileLogger.js";
import WeatherReqInfoDao from "./app/data/dao/impl/database/weatherReqInfo.mysql.dao.js";
import DbAnalyser from "./app/analyser/impl/dbAnalyser.js";
import chain from "./app/domain/setupChain.js";
import pool from "./app/data/context/pool.mysql.js";

const logger = new FileLogger("log.txt");
const weatherReqInfoDao = new WeatherReqInfoDao(pool);
const analyser = new DbAnalyser(weatherReqInfoDao);
const controller = new WeatherController(chain, logger, analyser);

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false, limit: "50mb" }));

app.get("/weather/", (req, res) => {
  res.send({
    message: "Welcome to 'What's Ur Weather' weather api section",
  });
});

app.get("/weather/current", controller.getCurrentWeather);

app.get("/*", (req, res) => {
  res.status(404).send({ message: "Resource not found" });
});

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  logger.log(`Server is running on port ${PORT}.`);
});

export default server;
