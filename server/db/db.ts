import Sequelize from 'sequelize';
import { DbInterface } from 'typings/DbInterface';
import { ChurchFactory } from 'models/Church';
import { UserFactory } from 'models/User';
import { TaskFactory } from 'models/Task';
import { RoleFactory } from 'models/Role';
import configJson from './config';

const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
const config = configJson[env];
config.logging = false;

const createModels = (): DbInterface => {
    const sequelize = new Sequelize(
        config.database,
        config.username,
        config.password,
        config,
    );

    const db: DbInterface = {
        sequelize,
        Sequelize,
        Church: ChurchFactory(sequelize, Sequelize),
        User: UserFactory(sequelize, Sequelize),
        Task: TaskFactory(sequelize, Sequelize),
        Role: RoleFactory(sequelize, Sequelize),
    };
    return db;
};

export default createModels;
