import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from 'shared/SequelizeTypings/typings/SequelizeAttributes';
import { TaskInstance, TaskAttributes } from 'shared/SequelizeTypings/models';

const TaskFactory = (
    sequelize: Sequelize.Sequelize,
    DataTypes: Sequelize.DataTypes,
): Sequelize.Model<TaskInstance, TaskAttributes> => {
    const attributes: SequelizeAttributes<TaskAttributes> = {
        date: { type: DataTypes.STRING },
    };

    const Task = sequelize.define<TaskInstance, TaskAttributes>('Task', attributes);

    Task.associate = (models) => {
        Task.belongsTo(models.Church);
        Task.belongsTo(models.User);
    };
    return Task;
};

export default TaskFactory;
