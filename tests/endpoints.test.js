import { expect } from "chai";
import supertest from "supertest";

import server from "../dist/server.js";

describe("Testing the API endpoints", () => {
  it("should return status OK and a message in reponse for base weather root", async () => {
    const response = await supertest(server).get("/weather");

    expect(response.status).to.be.equal(200);
    expect(response.body).to.haveOwnProperty("message");
  });

  it("should return status 404 for root /any (and other not supported roots)", async () => {
    const response = await supertest(server).get("/any");

    expect(response.status).to.be.equal(404);
  });

  it("should send temperature, humidity and windSpeed in response to /weather/current?city=London", async () => {
    const response = await supertest(server).get(
      "/weather/current?city=London"
    );

    expect(response.body).to.haveOwnProperty("temperature");
    expect(response.body).to.haveOwnProperty("humidity");
    expect(response.body).to.haveOwnProperty("windSpeed");
  });
});

export default {};
