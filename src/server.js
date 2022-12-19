const http = require('http');

const app = require('./app');
const { port } = require('./config/config');
const database = require('./config/database');
const { cmdMigrate } = require('./migrate');

app.set('port', port);

const server = http.createServer(app);

database
  .authenticate()
  .then(() => {
    console.log('Database is connected');
    cmdMigrate();
  })
  .then(() => {
    server.on('listening', () => console.log(`Server started at port: ${port}`));
    server.listen(port);
  });

module.exports = app;
