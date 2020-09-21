const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

/* GET home page. */
router.get('/', async (req, res, next) => {
  await knex('studyYear')
    .select()
    .orderBy('studyYear')
    .then(studyYear => {
      console.log(studyYear);
      res.render('year', { title: 'Évfolyamok', studyYear: studyYear });
    });
});

// GET class page
router.get('/:id', async (req, res, next) => {
  const id = req.params.id;
  const classBody = req.body;
  console.log('class-os params: ', id);
  console.log('class-os body: ', classBody);
  await knex('classes')
    // .select('classes.*', 'studyYear.studyYear', 'studyYear.id').from('classes')
    .select('classes.*', 'studyYear.studyYear', 'studyYear.id as yearId').from('classes')
    .join('studyYear', 'studyYear.id', '=', 'studyYear_id')
    .where('studyYear_id', id)
    .then(classYear => {
      console.log('StudyYear_id:', id);
      console.log('Classes', classYear);
      console.log('Class Id', classYear[0].id);
      res.render('class', { title: `${classYear[0].studyYear}`, classes: classYear });
    });
});

// students of class page
router.get('/:id/class/:id', async (req, res, next) => {
  const id = req.params.id;
  console.log('ID: ', id);
  await knex('students')
    .select('students.*', 'classes.studyYear_id as yearId',
      'classes_id as classId', 'classes.class as className').from('students')
    // .select('students.*', 'firstName', 'lastName', 'classes.class', 'classes.id as classId').from('students')
    // .select('students.*', 'classes.class', 'classes.id as classId', 'studyYear.studyYear', 'studyYear.id as yearId').from('students')
    .join('classes', 'classes.id', '=', 'students.classes_id')
    // .join('studyYear', 'studyYear.id', '=', 'studyYear_id')
    .where('classes_id', id)
    .then(studentS => {
      console.log(('className: ', studentS));
      console.log(('stundentS: ', studentS[0].className));
      // res.render('students', { title: 'Hi', students: studentS });
      res.render('students', { title: `${studentS[0].className}`, students: studentS });
    });
});

// student datapage
router.get('/:id/class/:id/students/:id', async (req, res, next) => {
  const id = req.params.id;
  console.log('ID: ', id);
  await knex('students')
    .select('students.*', 'classes.studyYear_id as yearId',
      'classes_id as classId', 'classes.class as className').from('students')
    .select('students.*', 'firstName', 'lastName', 'classes.class', 'classes.id as classId').from('students')
    // .select('students.*', 'classes.class', 'classes.id as classId', 'studyYear.studyYear', 'studyYear.id as yearId').from('students')
    .join('classes', 'classes.id', '=', 'students.classes_id')
    // .join('studyYear', 'studyYear.id', '=', 'studyYear_id')
    .where('students.id', id)
    .then(studentS => {
      console.log('studentDate: ', studentS);
      console.log(('stundentS: ', studentS[0].className));
      // res.render('students', { title: 'Hi', students: studentS });
      res.render('datas', { title: `${studentS[0].firstName} ${studentS[0].lastName}`, student: studentS });
    });
});

router.post('/', async (req, res, next) => {
  console.log(req.body.newstudyYear);
  // if (isStudyYearValid(req.body)) {
  const studyYear = {
    studyYear: req.body.newstudyYear
  };
  console.log(studyYear);
  // insert into the database
  await knex('studyYear').insert(studyYear);
  res.redirect('/year');

  //  else {
  //   res.status(500);
  //   res.render('error', { message: 'Invalid input' });
  // }
});

// router.post('/:id', async (req, res, next) => {
//   console.log(req.body);

//   const newclass = {
//     class: req.body.newclass,
//     id: req.body.newclass_id
//   };
//   console.log(newclass);
//   // insert into the database
//   await knex('class').insert(newclass);
//   res.redirect('/class');

//  else {
//   res.status(500);
//   res.render('error', { message: 'Invalid input' });
// });

module.exports = router;
