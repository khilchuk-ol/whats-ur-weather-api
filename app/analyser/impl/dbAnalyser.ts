import Analyser from "../analyser.interface.js";
import WeatherReqInfoDao from "../../data/dao/weatherReqInfo.dao.interface";

class DbAnalyser implements Analyser {
  weatherDao: WeatherReqInfoDao;

  constructor(weatherDao: WeatherReqInfoDao) {
    this.weatherDao = weatherDao;
  }

  incrementCityCount = (city: string) => {
    this.weatherDao.incrementReqCount(city);
  };
}

export default DbAnalyser;
