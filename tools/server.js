var Hapi = require('hapi');
var server = new Hapi.Server({
  connections: {
    routes: {
      files: {
        relativeTo: __dirname + '/../'
      }
    }
  }
});

server.connection({
  host: 'localhost',
  port: 8080
});

// Rota do index.html
server.route({
  method: 'GET',
  path: '/',
  handler: function(request, reply) {
    reply.file('build/index.html');
  }
});

// Rota das páginas e conteúdos
server.route({
  method: 'GET',
  path: '/{param*}',
  handler: {
    directory: {
      path: 'build',
      listing: true
    }
  }
});

// Rota dos assets
server.route({
  method: 'GET',
  path: '/assets/{param*}',
  handler: {
    directory: {
      path: 'assets'
    }
  }
});

server.start(function(err) {
  if (err)
    throw err;

  console.log('Servidor iniciado em http://localhost:8080');
});
