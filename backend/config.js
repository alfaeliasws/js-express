require("dotenv").config();
const config = {
  dbPool:{
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  },
  db: {
    /* don't expose password or any sensitive info, done only for demo */
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  util: {
     base: process.env.URL_ENDPOINT
  }
};
module.exports = config;
