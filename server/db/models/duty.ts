import * as Sequelize from 'sequelize';
import db from '../db';

const Duty = db.define('duty', {
    date: { type: Sequelize.DATE },
});

export default Duty;
