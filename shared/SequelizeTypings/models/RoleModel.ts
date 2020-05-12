import * as Sequelize from 'sequelize';

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
