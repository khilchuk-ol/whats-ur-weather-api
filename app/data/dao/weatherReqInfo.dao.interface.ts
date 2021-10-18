import DAO from "./dao.interface.js";
import WeatherReqInfo from "../models/weatherReqInfo.js";

interface WeatherReqInfoDAOAbstr extends DAO<WeatherReqInfo> {
  incrementReqCount(city: string): Promise<unknown>;
}

export default WeatherReqInfoDAOAbstr;
