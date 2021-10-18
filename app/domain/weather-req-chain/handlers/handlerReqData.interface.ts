import CoordRes from "../../coord-strategy/coordRes.interface.js";

interface HandlerReqData {
  apiKey: string;
  url: string;
  getCoord?: (cityName: string) => Promise<CoordRes>;
  fields?: string[];
}

export default HandlerReqData;
