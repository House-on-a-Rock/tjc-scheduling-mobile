const Sequelize = require('sequelize');
const configJson = require('./config');

const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
const config = configJson[env];
config['logging'] = false;

const db = new Sequelize(config.database, config.username, config.password, config);

module.exports = db;
