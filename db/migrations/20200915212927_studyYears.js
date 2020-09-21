
exports.up = function (knex) {
  return knex.schema.createTable('studyYear', table => {
    table.increments();
    table.string('studyYear', 10);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('studyYear');
};
