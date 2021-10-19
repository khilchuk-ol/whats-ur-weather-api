import WeatherReqInfo from "../../../models/WeatherReqInfo.js";
import WeatherReqInfoDAOAbstr from "../../weatherReqInfo.dao.interface.js";

class WeatherReqInfoDao implements WeatherReqInfoDAOAbstr {
  private readonly data: WeatherReqInfo[];
  private index: number;

  constructor() {
    this.data = [];
    this.index = 0;
  }

  add = (item: WeatherReqInfo): Promise<void> =>
    new Promise((resolve, reject) => {
      item.id = this.index++;
      this.data.push(item);
    });

  update = (item: WeatherReqInfo): Promise<void> =>
    new Promise((resolve, reject) => {
      let entry = this.data.find(
        (i) => i.id === item.id || i.city === item.city
      );
      entry.city = item.city;
      entry.reqCount = item.reqCount;
    });

  remove = (item: WeatherReqInfo): Promise<void> =>
    new Promise((resolve, reject) => {
      const entry = this.data.find(
        (i) => i.id === item.id || i.city === item.city
      );

      const ind = this.data.indexOf(entry);
      this.data.splice(ind, 1);
    });

  incrementReqCount = async (city: string): Promise<void> =>
    new Promise((resolve, reject) => {
      let entry = this.data.find((i) => i.city === city);
      entry.reqCount++;
    });

  get = async (id: number): Promise<WeatherReqInfo> =>
    new Promise((resolve, reject) => {
      const entry = this.data.find((i) => i.id === id);

      resolve(entry);
    });

  getAll = (): Promise<WeatherReqInfo[]> =>
    new Promise((resolve, reject) => {
      resolve(this.data);
    });
}

export default WeatherReqInfoDao;
