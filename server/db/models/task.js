const Sequelize = require('sequelize');
const db = require('../db');

const Task = db.define('task', {
    date: { type: Sequelize.DATE },
    user: { type: Sequelize.STRING },
    role: { type: Sequelize.STRING },
    church: { type: Sequelize.STRING },
});

module.exports = Task;
