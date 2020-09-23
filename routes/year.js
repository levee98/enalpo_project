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
  const year = await knex('studyYear').select('studyYear').where('studyYear.id', id);
  console.log('Year: ', year[0].studyYear);
  await knex('classes')
    // .select('classes.*', 'studyYear.studyYear', 'studyYear.id').from('classes')
    .select('classes.*', 'studyYear.studyYear', 'studyYear.id as yearId').from('classes')
    .join('studyYear', 'studyYear.id', '=', 'studyYear_id')
    .where('studyYear_id', id)
    .then(classYear => {
      console.log('StudyYear_id:', id);
      console.log('Classes', classYear);
      // console.log('Class Id', classYear[0].id);
      res.render('class', { title: `${year[0].studyYear}`, classes: classYear });
      // res.render('class', { title: `${classYear[0].studyYear}`, classes: classYear });
    });
});

// students of class page
router.get('/:id/class/:id', async (req, res, next) => {
  const id = req.params.id;
  console.log('ID: ', id);
  const clasS = await knex('classes').select('class').where('classes.id', id);
  console.log('Class: ', clasS[0].class);
  await knex('students')
    .select('students.*', 'classes.studyYear_id as yearId', 'classes.id as classId',
      'classes_id as classId', 'classes.class as className').from('students')
    // .select('students.*', 'firstName', 'lastName', 'classes.class', 'classes.id as classId').from('students')
    // .select('students.*', 'classes.class', 'classes.id as classId', 'studyYear.studyYear', 'studyYear.id as yearId').from('students')
    .join('classes', 'classes.id', '=', 'students.classes_id')
    // .join('studyYear', 'studyYear.id', '=', 'studyYear_id')
    .where('classes_id', id)
    .then(studentS => {
      console.log(('className: ', studentS));
      // console.log(('stundentS: ', studentS[0].className));
      // res.render('students', { title: 'Hi', students: studentS });
      res.render('students', { title: `${clasS[0].class}`, classes: studentS });
      // res.render('students', { title: `${studentS[0].className}`, students: studentS });
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
// post year
router.post('/', async (req, res, next) => {
  console.log(req.body.newstudyYear);
  const studyYear = {
    studyYear: req.body.newstudyYear
  };
  console.log(studyYear);
  // insert into the database
  await knex('studyYear').insert(studyYear);
  await knex('classes').insert({ studyYear_id: studyYear.id })
    .where(studyYear.studyYear, studyYear);
  res.redirect('/year');
});

// class post
router.post('/:id', async (req, res, next) => {
  console.log('req.body: ', req.body);
  console.log('req.****s: ', req.rawHeaders[19][27]);
  // console.log('req.****s: ', req.rawHeaders[21]);
  const newclass = {
    class: req.body.newclass,
    id: req.rawHeaders[19][27]
    // id: req.body.yearId
  };
  console.log('newclass: ', newclass);
  console.log(newclass.yearId);
  // insert into the database
  // await knex('classes').returning(`${newclass.id}`)
  await knex('classes')
    .insert({ class: newclass.class, studyYear_id: newclass.id });
  res.redirect(`../${newclass.id}`);
});

module.exports = router;
