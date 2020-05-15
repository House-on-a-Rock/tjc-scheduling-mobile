const profile = {
    firstName: 'Ted',
    lastName: 'Chen',
    email: 'arealemailaddress@gmail.com',
    tasks: [
        {
            date: 'April 25, 2020',
            taskId: 3,
            role: 1, // FOREIGN KEY
            userId: 3, // FOREIGN KEY
            churchId: 1, // FOREIGN KEY
        },
        {
            taskId: 2,
            date: 'April 25, 2020',
            role: 2, // FOREIGN KEY
            userId: 3, // FOREIGN KEY
            churchId: 1, // FOREIGN KEY
        },
        {
            taskId: 7,
            date: 'April 30, 2020',
            role: 2, // FOREIGN KEY
            userId: 3, // FOREIGN KEY
            churchId: 1, // FOREIGN KEY
        },
        {
            taskId: 12,
            date: 'May 2, 2020',
            role: 2, // FOREIGN KEY
            userId: 3, // FOREIGN KEY
            churchId: 1, // FOREIGN KEY
        },
    ],
    churchTasks: {
        tasks: [
            {
                taskId: 3,
                date: 'April 28, 2020',
                role: 1, // FOREIGN KEY
                userId: 3, // FOREIGN KEY
                churchId: 3, // FOREIGN KEY
            },
            {
                taskId: 2,
                date: 'April 30, 2020',
                role: 2, // FOREIGN KEY
                userId: 2, // FOREIGN KEY
                churchId: 3, // FOREIGN KEY
            },
        ],
    },
};

module.exports = { profile };
// export default profile;

// give api user, date range, church
// api returns profile, user tasks and church tasks within range

// reducer needs
/*
  selected month/year/day 
  user reducer
*/
