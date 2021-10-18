export interface Coordinates {
  lat: number;
  lng: number;
}

type CoordRes = Coordinates | Error;

export default CoordRes;
