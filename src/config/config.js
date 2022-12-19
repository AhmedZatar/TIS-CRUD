require('dotenv').config();
const { PORT, DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME, DB_PORT, HASH_SALT, SECRET_KEY } =
  process.env;

const config = {
  port: PORT || 3000,
  dbHost: DB_HOST,
  dbName: DB_NAME,
  dbPassword: DB_PASSWORD,
  dbUsername: DB_USERNAME,
  dbPort: DB_PORT,
  hashSalt: HASH_SALT,
  secretKey: SECRET_KEY,
};

module.exports = config;
