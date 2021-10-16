import express from "express";

import JsonConfigReader from "./app/domain/config-reader/impl/json.configReader.js";
import weatherRouter from "./app/web/routes/weather.router.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false, limit: "50mb" }));

app.use("/weather", weatherRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

/*const reader = new JsonConfigReader("api-providers.conf.json");
console.log(await reader.readAllData());*/
