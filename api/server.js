const express = require("express");

const server = express();

server.use(express.json());

const CarsRouter = require("./cars/cars-router");
server.use("/api/cars", CarsRouter);

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

module.exports = server;
