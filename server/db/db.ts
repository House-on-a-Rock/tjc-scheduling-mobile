import configJson from './config';
import createModels from './models';

const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
const config = configJson[env];
config.logging = false;

const db = createModels(config.database, config.username, config.password, config);

export default db;
