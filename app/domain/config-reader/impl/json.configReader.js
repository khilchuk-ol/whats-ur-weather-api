import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

import ConfigReader from "../abstr/configReader.js";

const currDir = dirname(fileURLToPath(import.meta.url));
const CONFIG_FOLDER = path.resolve(currDir, "../../../../config");

class JsonConfigReader extends ConfigReader {
  #filePath = "";

  constructor(fileName) {
    super();

    this.#filePath = path.resolve(CONFIG_FOLDER, fileName);
  }

  readAllData = async () => {
    const promise = new Promise((resolve, reject) => {
      fs.readFile(this.#filePath, (err, data) => {
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
