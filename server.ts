import express from "express";

import weatherRouter from "./app/web/routes/weather.router.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false, limit: "50mb" }));

app.use("/weather", weatherRouter);

app.get("/*", (req, res) => {
  res.status(404).send({ message: "Resource not found" });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  // console.log(`Server is running on port ${PORT}.`);
});
