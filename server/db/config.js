require('dotenv').config();
const { secret_database } = require('../../secrets/secrets.js');

module.exports = {
    // development: {
    //     database: process.env.DB_NAME,
    //     username: process.env.DB_USER,
    //     password: process.env.DB_PASS,
    //     host: process.env.DB_HOST,
    //     dialect: 'postgres',
    // },
    development: {
        database: secret_database.dev.DB_NAME,
        username: secret_database.dev.DB_USERNAME,
        password: secret_database.dev.DB_PASSWORD,
        host: secret_database.dev.DB_HOST,
        dialect: 'postgres',
    },
};
