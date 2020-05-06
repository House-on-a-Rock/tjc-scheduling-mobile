const Sequelize = require('sequelize');
const db = require('../db');

const Duty = db.define('duty', {
    date: { type: Sequelize.DATE }
});

module.exports = Duty;