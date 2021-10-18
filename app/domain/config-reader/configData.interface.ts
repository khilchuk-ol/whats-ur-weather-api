export interface ApiData {
  readonly id: number;
  readonly name: string;
  readonly api_url: string;
  readonly key: string;
  readonly priority: number;
}

interface ConfigData {
  weather: ApiData[];
  geo: ApiData[];
}

export default ConfigData;
