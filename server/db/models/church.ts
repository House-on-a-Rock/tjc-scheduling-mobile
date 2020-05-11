import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from 'typings/SequelizeAttributes';

export interface ChurchAttributes {
    id?: number;
    name: string;
    address: string;
    description: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ChurchInstance
    extends Sequelize.Instance<ChurchAttributes>,
        ChurchAttributes {}

export const ChurchFactory = (
    sequelize: Sequelize.Sequelize,
    DataTypes: Sequelize.DataTypes,
): Sequelize.Model<ChurchInstance, ChurchAttributes> => {
    const attributes: SequelizeAttributes<ChurchAttributes> = {
        name: { type: DataTypes.STRING },
        address: { type: DataTypes.TEXT },
        description: { type: DataTypes.TEXT },
    };

    const Church = sequelize.define<ChurchInstance, ChurchAttributes>(
        'Church',
        attributes,
    );

    return Church;
};
