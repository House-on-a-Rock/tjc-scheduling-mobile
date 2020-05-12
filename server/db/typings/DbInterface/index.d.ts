import * as Sequelize from 'sequelize';
import { ChurchInstance, ChurchAttributes } from 'models/Church';
import { UserInstance, UserAttributes } from 'models/User';
import { TaskInstance, TaskAttributes } from 'models/Task';
import { RoleInstance, RoleAttributes } from 'models/Role';

export interface DbInterface {
    sequelize: Sequelize.Sequelize;
    Sequelize: Sequelize.SequelizeStatic;
    Church: Sequelize.Model<ChurchInstance, ChurchAttributes>;
    User: Sequelize.Model<UserInstance, UserAttributes>;
    Task: Sequelize.Model<TaskInstance, TaskAttributes>;
    Role: Sequelize.Model<RoleInstance, RoleAttributes>;
}
