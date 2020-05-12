import * as Sequelize from 'sequelize';
import {
    ChurchInstance,
    ChurchAttributes,
    UserInstance,
    UserAttributes,
    TaskInstance,
    TaskAttributes,
    RoleInstance,
    RoleAttributes,
} from 'shared/SequelizeTypings/models';

export interface DbInterface {
    sequelize: Sequelize.Sequelize;
    Sequelize: Sequelize.SequelizeStatic;
    Church: Sequelize.Model<ChurchInstance, ChurchAttributes>;
    User: Sequelize.Model<UserInstance, UserAttributes>;
    Task: Sequelize.Model<TaskInstance, TaskAttributes>;
    Role: Sequelize.Model<RoleInstance, RoleAttributes>;
}
