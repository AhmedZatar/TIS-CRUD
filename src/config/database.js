const Sequelize = require('sequelize');

const { dbHost, dbName, dbPassword, dbUsername } = require('./config');

module.exports = new Sequelize(dbName, dbUsername, dbPassword, {
  host: dbHost,
  dialect: 'postgres',
});
