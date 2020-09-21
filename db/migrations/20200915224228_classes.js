
exports.up = function (knex) {
  return knex.schema.createTable('classes', table => {
    table.increments();
    table.text('class', [10]);
    table.integer('studyYear_id').unsigned().references('id').inTable('studyYear');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('classes');
};
