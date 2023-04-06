const hapi = require('@hapi/hapi');
// const routes = require('./routes');
const notes = require('./api/notes');
// const NotesService = require('./services/inMemory/NotesService');
const NotesService = require('./services/postgres/NotesService');
const NotesValidator = require('./validator/notes');
require('dotenv').config();

const init = async () => {
  const notesService = new NotesService();
  const server =  hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  })

  await server.register({
    plugin: notes,
    options: {
      service: notesService,
      validator: NotesValidator,
    },
  });

  // server.route(routes)

  await server.start()
  console.log(`server berjalan di ${server.info.uri}`)
}

init()