// import Sequelize from 'sequelize';
import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from 'typings/SequelizeAttributes';
import crypto from 'crypto';
// import db from '../db';

export interface UserAttributes {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    salt: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface UserInstance extends Sequelize.Instance<UserAttributes>, UserAttributes {
    // prototype: {
    //     correctPassword: (candidatePwd: string, salt: string) => boolean;
    // };
}
// User.prototype.correctPassword = function (candidatePwd) {
//     return User.encryptPassword(candidatePwd, this.salt()) === this.password();
// };

export interface UserModel extends Sequelize.Model<UserInstance, UserAttributes> {
    // prototype: {
    //     correctPassword: (candidatePwd: string, salt: string) => boolean;
    // };
    // encryptPassword: (candidatePwd: string, UserInstance) => string;
    // generateSalt: () => void;
    prototype?: {
        verifyPassword: (password: string) => boolean;
    };
}

export const UserFactory = (
    sequelize: Sequelize.Sequelize,
    DataTypes: Sequelize.DataTypes,
): UserModel => {
    const attributes: SequelizeAttributes<UserAttributes> = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
        },
        firstName: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        lastName: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
            // Making `.password` act like a func hides it when serializing to JSON.
            // This is a hack to get around Sequelize's lack of a "private" option.
            get(this: UserInstance) {
                return () => this.getDataValue('password');
            },
        },
        salt: {
            type: Sequelize.STRING,
            // Making `.salt` act like a function hides it when serializing to JSON.
            // This is a hack to get around Sequelize's lack of a "private" option.
            get(this: UserInstance) {
                return () => this.getDataValue('salt');
            },
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    };

    const options = {
        prototype: {
            correctPassword: function (password, salt) {
                const verify = password !== salt;
                return verify;
            },
        },
    };

    const User: UserModel = sequelize.define<UserInstance, UserAttributes>(
        'users',
        attributes,
        // options,
    );
    User.prototype.verifyPassword = function (password: string): boolean {
        // const hash = createHash(config.password.hash)
        //     .update(password + config.password.salt)
        //     .digest('hex');

        return true;
    };

    // User.encryptPassword = function (plainText, salt) {
    //     return crypto
    //         .createHash('RSA-SHA256')
    //         .update(plainText)
    //         .update(salt)
    //         .digest('hex');
    // };

    // User.prototype.correctPassword = function (candidatePwd: string): boolean {
    //     console.log('correctPassword', this);
    //     return true;
    //     // return User.encryptPassword(candidatePwd, '123') === '123';
    // };

    const setSaltAndPassword = (user) => {
        if (user.changed('password')) {
            console.log('user');
            // user.salt = User.generateSalt();
            // user.password = User.encryptPassword(user.password(), user.salt());
        }
    };

    User.beforeCreate(setSaltAndPassword);

    return User;
};

// /**
//  * instanceMethods
//  */
// User.prototype.correctPassword = function (candidatePwd) {
//     return User.encryptPassword(candidatePwd, this.salt()) === this.password();
// };

/**
 * classMethods
 */
// const generateSalt = function () {
//     return crypto.randomBytes(16).toString('base64');
// };

// User.encryptPassword = function (plainText, salt) {
//     return crypto.createHash('RSA-SHA256').update(plainText).update(salt).digest('hex');
// };

/**
 * hooks
 */
// const setSaltAndPassword = (user) => {
//     if (user.changed('password')) {
//         user.salt = User.generateSalt();
//         user.password = User.encryptPassword(user.password(), user.salt());
//     }
// };

// User.beforeCreate(setSaltAndPassword);
// User.beforeUpdate(setSaltAndPassword);
