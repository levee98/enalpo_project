
exports.up = function (knex) {
  return knex.schema.createTable('classes', table => {
    table.increments().notNullable().primary();
    table.text('class', [10]);
    table.integer('studyYear_id').unsigned().references('id').inTable('studyYear');
    // table.integer('studyYear_id').unsigned().notNullable().references('id').inTable('studyYear');
    // table.integer('studyYear_id').unsigned().default().notNullable().references('id').inTable('studyYear').onUpdate('CASCADE');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('classes');
};
