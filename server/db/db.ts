import Sequelize from 'sequelize';
import configJson from './config';

const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
const config = configJson[env];
config['logging'] = false;

const db = new Sequelize.Sequelize(
    config.database,
    config.username,
    config.password,
    config,
);

export default db;
