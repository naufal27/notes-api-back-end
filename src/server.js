const hapi = require('@hapi/hapi');
// const routes = require('./routes');
const notes = require('./api/notes');
const NotesService = require('./services/inMemory/NotesService');

const init = async () => {
  const notesService = new NotesService();
  const server =  hapi.server({
    port: 5000,
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
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
    },
  });

  // server.route(routes)

  await server.start()
  console.log(`server berjalan di ${server.info.uri}`)
}

init()