// DO YOUR MAGIC
const router = require("express").Router();
const Cars = require("./cars-model");

const {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
} = require("./cars-middleware");

router.get("/", (req, res, next) => {
  Cars.getAll().then((cars) => {
    res.status(200).json(cars);
  });
});

router.get("/:id", checkCarId, (req, res, next) => {
  res.status(200).json(req.car);
});

router.post(
  "/",
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
  async (req, res, next) => {

    const newCar = {
      vin: req.body.vin,
      make: req.body.make,
      model: req.body.model,
      mileage: req.body.mileage,
      title: req.body.title,
      transmission: req.body.transmission,
    };
    const car = await Cars.create(newCar);
    res.status(200).json(car);
  }
);

router.use((err, req, res) => {
  
  res.status(err.status || 500).json({
    message: "something went wrong inside the cars router",
    errMessage: err.message,
  });
});

module.exports = router;