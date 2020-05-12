const Sequelize = require('sequelize');
const db = require('../db');

const Task = db.define('task', {
    date: { type: Sequelize.DATE },
});

module.exports = Task;
