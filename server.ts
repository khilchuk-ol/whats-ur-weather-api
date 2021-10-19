import express from "express";

import WeatherController from "./app/web/controllers/weather.controller.js";
import FileLogger from "./app/logger/impl/fileLogger.js";
import dbConfig from "./config/mysql.db.config.js";
import UnitOfWork from "./app/data/unit-of-work/unitOfWork.mysql.js";
import WeatherReqInfoDao from "./app/data/dao/impl/database/weatherReqInfo.mysql.dao.js";
import DbAnalyser from "./app/analyser/impl/dbAnalyser.js";
import chain from "./app/domain/setupChain.js";

const logger = new FileLogger("log.txt");
const uow = new UnitOfWork(dbConfig, (conn) => new WeatherReqInfoDao(conn));
const analyser = new DbAnalyser(uow.weatherReqInfoDao);
const controller = new WeatherController(chain, logger, analyser);

const app = express();

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

server.on("close", () => {
  uow.closeConnection();
  logger.log(`Server is closed.`);
});

process.on("SIGINT", () => {
  server.close();
});
