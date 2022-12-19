const Umzug = require('umzug');
const db = require('./models');

const umzug = new Umzug({
  migrations: {
    path: './src/migrations',
    pattern: /\.js$/,
    params: [
      db.sequelize.getQueryInterface(), // queryInterface
      db.sequelize.constructor, // DataTypes
      () => {
        throw new Error(
          // eslint-disable-next-line max-len
          'Migration tried to use old style "done" callback. Please upgrade to "umzug" and return a promise instead.'
        );
      },
    ],
  },
  storage: 'sequelize',
  storageOptions: { sequelize: db.sequelize },
  logging: (...args) => console.log.apply(null, args),
});

/**
 * Apply all migrations.
 */
const cmdMigrate = () => umzug.up();

module.exports = {
  cmdMigrate,
};
