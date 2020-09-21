
exports.seed = function (knex) {
  return knex('classes').del()
    .then(function () {
      const classes = [
        { class: '9.A', studyYear_id: 1 },
        { class: '9.B', studyYear_id: 1 },
        { class: '9.A', studyYear_id: 2 },
        { class: '9.B', studyYear_id: 2 },
        { class: '10.A', studyYear_id: 1 },
        { class: '10.B', studyYear_id: 1 },
        { class: '9.knyA', studyYear_id: 2 },
        { class: '9.knyB', studyYear_id: 2 },
        { class: '11.A', studyYear_id: 1 }
      ];
      return knex('classes').insert(classes);
    });
};
