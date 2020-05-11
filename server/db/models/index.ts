// import db from '../db';
// import Church from './church';
// import User from './user';
// import { Role } from './Role';
// import { Task } from './Task';

// /**
//  * associations
//  */
// // USER
// Church.hasMany(User);
// User.belongsTo(Church);
// Role.hasMany(User);
// User.belongsTo(Role);

// // DUTIES
// User.hasMany(Task);
// Task.belongsTo(User);
// Role.hasMany(Task);
// Task.belongsTo(Role);
// Church.hasMany(Task);
// Task.belongsTo(Church);

// // ROLES
// Church.hasMany(Role);
// Role.belongsTo(Church);

// module.exports = {
//     db,
//     Church,
//     User,
//     Role,
//     Task,
// };
