const db = require('../db');
const Church = require('./church');
const User = require('./user');
const Role = require('./role');
const Task = require('./task');

/**
 * associations
 */
//USER
Church.hasMany(User);
User.belongsTo(Church);
Role.hasMany(User);
User.belongsTo(Role);

//Tasks;
User.hasMany(Task);
Task.belongsTo(User);
Role.hasMany(Task);
Task.belongsTo(Role);
Church.hasMany(Task);
Task.belongsTo(Church);

//ROLES
Church.hasMany(Role);
Role.belongsTo(Church);

module.exports = {
    db,
    Church,
    User,
    Role,
    Task,
};
