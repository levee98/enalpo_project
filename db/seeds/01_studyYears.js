
exports.seed = function (knex) {
  return knex('studyYear').del()
    .then(function () {
      const studyYear = [
        { studyYear: '2018-2019' },
        { studyYear: '2019-2020' }
      ]; // Inserts seed entries
      return knex('studyYear').insert(studyYear);
    });
};
