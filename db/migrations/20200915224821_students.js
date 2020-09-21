
exports.up = function (knex) {
  return knex.schema.createTable('students', table => {
    table.increments();
    table.text('firstName', [20]).notNullable();
    table.text('lastName', [30]).notNullable();
    table.text('birthPlace', [30]).notNullable();
    table.date('birthDate').notNullable();
    table.text('nameOfMother', [50]).notNullable();
    table.text('email').notNullable();
    table.text('telephoneNumber', [16]).notNullable();
    table.integer('postCode', 4).notNullable();
    table.text('city', [23]).notNullable();
    table.text('address', [30]).notNullable();
    table.text('image');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.integer('studyYear_id').unsigned().references('id').inTable('studyYear');
    table.integer('classes_id').unsigned().references('id').inTable('classes');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('students');
};
