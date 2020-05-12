import * as Sequelize from 'sequelize';

export interface UserAttributes {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    password: any;
    salt: any;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface UserInstance
    extends Sequelize.Instance<UserAttributes>,
        UserAttributes {}

export interface UserModel extends Sequelize.Model<UserInstance, UserAttributes> {
    prototype: {
        verifyPassword: (this: UserAttributes, password: string) => boolean;
    };
    generateSalt: () => string;
    encryptPassword: (plainText: string, salt) => string;
}
