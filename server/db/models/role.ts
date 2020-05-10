import * as Sequelize from 'sequelize';
import db from '../db';

const Role = db.define('role', {
    name: { type: Sequelize.STRING },
    time: { type: Sequelize.DATE },
});

export default Role;
