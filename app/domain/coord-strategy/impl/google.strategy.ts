import axios from "axios";

import CoordinatesStrategy from "../coord.strategy.interface.js";
import { parseUrl } from "../../utils/url.utils.js";
import { ApiData } from "../../config-reader/configData.interface.js";

class GoogleStrategy implements CoordinatesStrategy {
  apiKey: string;
  url: string;

  constructor(apiData: ApiData) {
    this.apiKey = apiData.key;
    this.url = apiData.api_url;

    this.getCoordinates = this.getCoordinates.bind(this);
  }

  getCoordinates = async (cityName: string) => {
    const urlValues = {
      APIkey: this.apiKey,
      Address: cityName,
    };

    const url = parseUrl(this.url, urlValues);

    let error: Error;

    const data = await axios
      .get(url)
      .then((res) => {
        // @ts-ignore: Unreachable code error
        const err: string = res.data.error_message;
        if (err) {
          throw {
            message: err,
          };
        }
        // @ts-ignore: Unreachable code error
        return res.data.results[0].geometry.location;
      })
      .catch((err) => {
        error = err;
      });

    return error ? error : { lat: data.lat, lng: data.lng };
  };
}

export default GoogleStrategy;
