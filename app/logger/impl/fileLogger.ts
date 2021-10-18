import path, { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";

import Logger from "../logger.interface.js";

const currDir = dirname(fileURLToPath(import.meta.url));
const LOG_FOLDER = path.resolve(currDir, "../../../../logs");

class FileLogger implements Logger {
  filePath: string;

  constructor(fileName: string) {
    if (!fileName.trim()) {
      throw new Error("logger file name cannot be empty");
    }

    this.filePath = path.resolve(LOG_FOLDER, fileName);
  }

  log = (message: string) => {
    fs.appendFile(
      this.filePath,
      `
      ${"-".repeat(15)}
      ${new Date().toUTCString()}. ${message}`,
      (err) => {
        if (err) throw err;
      }
    );
  };
}

export default FileLogger;
