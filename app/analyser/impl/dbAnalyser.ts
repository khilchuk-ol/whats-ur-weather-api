import DAO from "../../data/dao/dao.interface.js";
import WeatherReqInfo from "../../data/models/WeatherReqInfo.js";
import Analyser from "../analyser.interface.js";

class DbAnalyser implements Analyser {
  weatherDao: DAO<WeatherReqInfo>;

  constructor(weatherDao: DAO<WeatherReqInfo>) {
    this.weatherDao = weatherDao;
  }

  incrementCityCount = (city: string) => {
    this.weatherDao.find();
  };
}

export default DbAnalyser;
