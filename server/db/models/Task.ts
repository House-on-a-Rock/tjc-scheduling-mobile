import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from 'typings/SequelizeAttributes';

export interface TaskAttributes {
    id?: number;
    churchId?: number;
    userId?: number;
    date: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface TaskInstance
    extends Sequelize.Instance<TaskAttributes>,
        TaskAttributes {}

export const TaskFactory = (
    sequelize: Sequelize.Sequelize,
    DataTypes: Sequelize.DataTypes,
): Sequelize.Model<TaskInstance, TaskAttributes> => {
    const attributes: SequelizeAttributes<TaskAttributes> = {
        date: { type: DataTypes.STRING },
    };

    const Task = sequelize.define<TaskInstance, TaskAttributes>('Task', attributes);

    return Task;
};
