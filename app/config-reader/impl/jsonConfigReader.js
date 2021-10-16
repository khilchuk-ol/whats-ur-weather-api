import { json } from "express";
import fs from "fs";

import ConfigReader from "../abstr/configReader";

class JsonConfigReader extends ConfigReader {
  constructor(filePath) {
    this.filePath = filePath;
  }

  readAllData = async () => {
    const promise = new Promise((resolve, reject) => {
      fs.readFile(this.filePath, (err, data) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(data);
      });
    });

    const text = await promise;
    return JSON.parse(text);
  };
}

export default JsonConfigReader;
