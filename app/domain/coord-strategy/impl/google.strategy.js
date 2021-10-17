import axios from "axios";

import CoordinatesStrategy from "../abstr/coord.strategy.js";
import { parseUrl } from "../../utils/url.utils.js";

class GoogleStrategy extends CoordinatesStrategy {
  constructor(apiData) {
    super();

    this.apiKey = apiData.key;
    this.url = apiData.api_url;

    this.getCoordinates = this.getCoordinates.bind(this);
  }

  getCoordinates = async (cityName) => {
    const urlValues = {
      APIkey: this.apiKey,
      Address: cityName,
    };

    const url = parseUrl(this.url, urlValues);

    let error = null;
    const data = await axios
      .get(url)
      .then((res) => {
        const err = res.data.error_message;
        if (err) {
          throw {
            message: err,
          };
        }

        return res.data.results[0].geometry.location;
      })
      .catch((err) => {
        error = err;
      });

    return [data.lat, data.lng, error];
  };
}

export default GoogleStrategy;
