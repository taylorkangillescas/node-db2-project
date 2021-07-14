const db = require("../../data/db-config");

const getAll = () => {
  // DO YOUR MAGIC
  return db("cars");
};

const getById = (id) => {
  // DO YOUR MAGIC
  return db("cars").where({ id }).first();
};

const create = async (car) => {
  // DO YOUR MAGIC
  const [newCar] = await db("cars").insert(car);
  const foo = await getById(newCar);
  return foo;
};

const getVinNumber = (vin) => {
  return db("cars").where({ vin }).first();
};

module.exports = {
  getAll,
  getById,
  create,
  getVinNumber,
};