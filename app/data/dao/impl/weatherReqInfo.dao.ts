import WeatherReqInfo from "../../models/WeatherReqInfo";
import WeatherReqInfoDAOAbstr from "../weatherReqInfo.dao.interface";

class WeatherReqInfoDao implements WeatherReqInfoDAOAbstr {
  connection: any;
  table: string;

  constructor(connection: any) {
    this.connection = connection;
    this.table = "weather_req_info";
  }

  add = (item: WeatherReqInfo): Promise<void> =>
    new Promise((resolve, reject) => {
      this.connection.query(
        `insert into ${this.table}
                                (city, req_count)
                         values (${
                           (item.city, item.reqCount > 0 ? item.reqCount : 1)
                         })`,
        (err: Error, res: any) => {
          if (err) {
            reject(err);
          }

          const insertId = res.insertId;
          item.id = insertId;
        }
      );
    });

  update = (item: WeatherReqInfo): Promise<void> =>
    new Promise((resolve, reject) => {
      this.connection.query(
        `update ${this.table}
         set city = ${item.city}, req_count = ${item.reqCount}
         where id = ${item.id} or city = ${item.city};`,
        (err: Error, res: any) => {
          if (err) {
            reject(err);
          }
        }
      );
    });

  remove = (item: WeatherReqInfo): Promise<void> =>
    new Promise((resolve, reject) => {
      this.connection.query(
        `delete from ${this.table} where id = ${item.id} or city = ${item.city};`,
        (err: Error, res: any) => {
          if (err) {
            reject(err);
          }
        }
      );
    });

  incrementReqCount = async (city: string): Promise<void> =>
    new Promise((resolve, reject) => {
      this.connection.query(
        `call increment_city_req_counter(${city});`,
        (err: Error, res: any) => {
          if (err) {
            reject(err);
          }

          resolve(undefined);
        }
      );
    });

  get = async (id: number): Promise<WeatherReqInfo> =>
    new Promise((resolve, reject) => {
      {
        this.connection.query(
          `select * from ${this.table} where id = ${id};`,
          (err: Error, res: any) => {
            if (err) {
              reject(err);
            }

            const row = res[0];

            const info: WeatherReqInfo = {
              id: row.id,
              city: row.city,
              reqCount: row.req_count,
            };

            resolve(info);
          }
        );
      }
    });

  getAll = (): Promise<WeatherReqInfo[]> =>
    new Promise((resolve, reject) => {
      this.connection.query(
        `select * from ${this.table};`,
        (err: Error, res: any) => {
          if (err) {
            reject(err);
          }

          const rows = res;
          const infos: WeatherReqInfo[] = [];

          rows.forEach((row: any) => {
            const info: WeatherReqInfo = {
              id: row.id,
              city: row.city,
              reqCount: row.req_count,
            };

            infos.push(info);
          });

          resolve(infos);
        }
      );
    });
}

export default WeatherReqInfoDao;
