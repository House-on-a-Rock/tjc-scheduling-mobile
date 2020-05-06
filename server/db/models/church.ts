const Sequelize = require('sequelize');
const db = require('../db');

const Church = db.define('church', {
	name: { type: Sequelize.STRING },
	address: { type: Sequelize.STRING },
	description: { type: Sequelize.TEXT },
});

module.exports = Church;
