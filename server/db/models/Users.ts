import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from 'typings/SequelizeAttributes';
import crypto from 'crypto';

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

export const UserFactory = (
    sequelize: Sequelize.Sequelize,
    DataTypes: Sequelize.DataTypes,
): Sequelize.Model<UserInstance, UserAttributes> => {
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

    const User = sequelize.define<UserInstance, UserAttributes>(
        'users',
        attributes,
    ) as UserModel;

    User.generateSalt = function () {
        return crypto.randomBytes(16).toString('base64');
    };

    User.encryptPassword = function (plainText, salt) {
        return crypto
            .createHash('RSA-SHA256')
            .update(plainText)
            .update(salt)
            .digest('hex');
    };

    User.prototype.verifyPassword = function (this, candidatePwd: string): boolean {
        const salt = this.salt();
        return User.encryptPassword(candidatePwd, salt) === this.password();
    };

    const setSaltAndPassword = (user) => {
        if (user.changed('password')) {
            user.salt = User.generateSalt();
            user.password = User.encryptPassword(user.password(), user.salt());
        }
    };

    User.beforeCreate(setSaltAndPassword);
    User.beforeUpdate(setSaltAndPassword);

    User.associate = (models) => {
        User.belongsTo(models.Church);
        User.hasMany(models.Role);
        User.hasMany(models.Task);
    };

    return User;
};
