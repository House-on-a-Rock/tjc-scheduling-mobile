import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from 'typings/SequelizeAttributes';

export interface RoleAttributes {
    id?: number;
    name: string;
    time: Date;
    createdAt?: Date;
    updatedAt?: Date;
    churchId?: number;
}

export interface RoleInstance
    extends Sequelize.Instance<RoleAttributes>,
        RoleAttributes {}

export const RoleFactory = (
    sequelize: Sequelize.Sequelize,
    DataTypes: Sequelize.DataTypes,
): Sequelize.Model<RoleInstance, RoleAttributes> => {
    const attributes: SequelizeAttributes<RoleAttributes> = {
        name: {
            type: DataTypes.STRING,
        },
        time: {
            type: DataTypes.DATE,
        },
    };

    const Role = sequelize.define<RoleInstance, RoleAttributes>('Role', attributes);

    Role.associate = (models) => {
        Role.belongsTo(models.Church);
        Role.belongsTo(models.User);
    };

    return Role;
};
