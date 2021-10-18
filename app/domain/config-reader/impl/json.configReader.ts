import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

import ConfigReader, { ReadResult } from "../configReader.interface.js";
import ConfigData from "../configData.interface.js";

const currDir = dirname(fileURLToPath(import.meta.url));
const CONFIG_FOLDER = path.resolve(currDir, "../../../../../config");

class JsonConfigReader implements ConfigReader {
  private filePath: string;

  constructor(fileName: string) {
    this.filePath = path.resolve(CONFIG_FOLDER, fileName);
  }

  readAllData = async () =>
    new Promise<ReadResult>((resolve, reject) => {
      fs.readFile(this.filePath, (err: Error, data) => {
        if (err) {
          reject(err);
          return;
        }

        const res: ConfigData = JSON.parse(data.toString());

        resolve(res);
      });
    });
}

export default JsonConfigReader;
