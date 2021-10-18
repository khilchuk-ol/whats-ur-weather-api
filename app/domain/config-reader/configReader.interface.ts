import ConfigData from "./configData.interface.js";

export type ReadResult = ConfigData | Error;

interface ConfigReader {
  readAllData(): Promise<ReadResult>;
}

export default ConfigReader;
