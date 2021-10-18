import CoordRes from "./coordRes.interface.js";

interface CoordinatesStrategy {
  getCoordinates(cityName: string): Promise<CoordRes>;
}

export default CoordinatesStrategy;
