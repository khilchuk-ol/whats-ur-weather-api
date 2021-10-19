import mysql from "mysql";

import WeatherReqInfoDao from "../dao/impl/database/weatherReqInfo.mysql.dao.js";

class UnitOfWork {
  readonly connection: mysql.Connection;
  readonly weatherReqInfoDao: WeatherReqInfoDao;

  constructor(
    dbConfig: mysql.ConnectionConfig,
    createWeatherReqInfoDao: (connection: mysql.Connection) => WeatherReqInfoDao
  ) {
    this.connection = mysql.createConnection(dbConfig);
    this.weatherReqInfoDao = createWeatherReqInfoDao(this.connection);
  }

  openConnection() {
    this.connection.connect();
  }

  closeConnection() {
    this.connection.end();
  }
}

export default UnitOfWork;
