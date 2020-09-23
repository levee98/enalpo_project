
exports.up = function (knex) {
  return knex.schema.createTable('classes', table => {
    table.increments().notNullable().primary();
    table.text('class', [10]);
    table.integer('studyYear_id').unsigned().default().references('id').inTable('studyYear');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('classes');
};
