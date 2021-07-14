const Cars = require("./cars-model");
const db = require("../../data/db-config");
const vinValidator = require("vin-validator");

const checkCarId = async (req, res, next) => {
  // DO YOUR MAGIC
  const id = req.params.id;
  const exist = await Cars.getById(id);
  try {
    if (!exist) {
      res.status(404).json({ message: `car with id ${id} is not found` });
    } else {
      req.car = exist;
      next();
    }
  } catch (err) {
    next(err);
  }
};

const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
  const { vin, make, model, mileage } = req.body;

  if (!vin) {
    res.status(400).json({ message: "vin is missing" });
  } else if (!make) {
    res.status(400).json({ message: "make is missing" });
  } else if (!model) {
    res.status(400).json({ message: "model is missing" });
  } else if (!mileage) {
    res.status(400).json({ message: "mileage is missing" });
  } else {
    next();
  }
};

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
  const vin = req.body.vin;
  const isValidVin = vinValidator.validate(vin);
  if (!isValidVin) {
    res.status(400).json({
      message: `vin ${vin} is invalid`,
    });
  } else {
    next();
  }
};

const checkVinNumberUnique = (req, res, next) => {
  // DO YOUR MAGIC
  const vin = req.body.vin;
  Cars.getVinNumber(vin).then((car) => {
    console.log(vin);
    if (!car) {
      next();
    } else {
      res.status(400).json({
        message: `vin ${vin} already exists`,
      });
    }
  });
};

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
};