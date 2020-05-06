const Sequelize = require('sequelize');
const db = require('../db');

const Role = db.define('role', {
    name: { type: Sequelize.STRING },
    time: { type: Sequelize.DATE }
});

module.exports = Role;