import CoordinatesStrategy from "../abstr/coord.strategy";
import { parseUrl } from "../../utils/url.utils/js";

class GoogleStrategy extends CoordinatesStrategy {
  constructor(apiData) {
    this.apiKey = apiData.key;
    this.url = apiData.api_url;
  }

  getCoordinates = (cityName) => {
    const urlValues = {
      APIkey: this.apiKey,
      Address: cityName,
    };

    const url = parseUrl(this.url, urlValues);

    let error = null;
    const data = await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        return data.results[0].geometry.location;
      })
      .catch((err) => {
        error = err;
      });

    return [data.lat, data.lng, error];
  };
}

export default GoogleStrategy;
