exports.up = function (knex) {
  return knex.schema.createTable("cars", (table) => {
    table.increments("id");
    table.text("vin", 124).unique().notNullable();
    table.text("make", 124).notNullable();
    table.text("model", 124).notNullable();
    table.integer("mileage").notNullable();
    table.text("title");
    table.text("transmission");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("cars");
};