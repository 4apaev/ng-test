'use strict';
const Db      = require('nanomule/lib/db');
const Body    = require('nanomule/lib/body');
const Cors    = require('nanomule/lib/cors');
const Logger  = require('nanomule/lib/logger');
const Mule    = require('nanomule');
const { PORT=3000 } = process.env;

;(async () => {
  const DB = new Db;
  const App = new Mule;

  const list = ctx => ctx.query;
  const save = ctx => ctx.payload;
  const find = ctx => ctx.params.id;

  await DB.connect('school');
  await DB.define('students', { name: { $type: 'string' }});
  await DB.define('teachers', { name: { $type: 'string' }});

  App
    .use(Logger)
    .use(Cors)

    .get('/students', DB.students.route('list', list))
    .get('/teachers', DB.teachers.route('list', list))

    .del('/students/:id', DB.students.route('remove', find))
    .del('/teachers/:id', DB.teachers.route('remove', find))

    .use(Body)

    .put('/students', DB.students.route('update', save))
    .put('/teachers', DB.teachers.route('update', save))

    .post('/students',  DB.students.route('create', save))
    .post('/teachers',  DB.teachers.route('create', save))

    .listen(PORT);

})();

