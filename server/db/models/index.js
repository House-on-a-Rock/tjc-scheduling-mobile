const db = require('../db');
const Church = require('./church');
const User = require('./user');
const Role = require('./role');
const Duty = require('./duty');

/**
 * associations
 */
//USER
Church.hasMany(User);
User.belongsTo(Church);
Role.hasMany(User);
User.belongsTo(Role);

//DUTIES
User.hasMany(Duty);
Duty.belongsTo(User);
Role.hasMany(Duty);
Duty.belongsTo(Role);
Church.hasMany(Duty);
Duty.belongsTo(Church);

//ROLES
Church.hasMany(Role);
Role.belongsTo(Church);

module.exports = {
    db,
    Church,
    User,
    Role,
    Duty,
};
