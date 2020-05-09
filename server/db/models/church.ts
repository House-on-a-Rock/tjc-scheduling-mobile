import Sequelize from 'sequelize';
import db from '../db';

const Church = db.define('church', {
    name: { type: Sequelize.STRING },
    address: { type: Sequelize.STRING },
    description: { type: Sequelize.TEXT },
});

export default Church;
