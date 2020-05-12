import Sequelize from 'sequelize';
import { DbInterface } from 'shared/SequelizeTypings/typings/DbInterface';
import ChurchFactory from './Church';
import UserFactory from './User';
import TaskFactory from './Task';
import RoleFactory from './Role';

const createModels = (database, username, password, config): DbInterface => {
    const sequelize = new Sequelize(database, username, password, config);

    const db: DbInterface = {
        sequelize,
        Sequelize,
        Church: ChurchFactory(sequelize, Sequelize),
        User: UserFactory(sequelize, Sequelize),
        Task: TaskFactory(sequelize, Sequelize),
        Role: RoleFactory(sequelize, Sequelize),
    };

    Object.keys(db).forEach((modelName) => {
        if (db[modelName].associate) {
            db[modelName].associate(db);
        }
    });

    // console.log(db.User);

    return db;
};

export default createModels;
