const { green, red, blue } = require('chalk');
const createModels = require('../server/db/models').default;

const configuration = {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false,
};

const db = createModels(
    configuration.database,
    configuration.username,
    configuration.password,
    configuration,
);

const churches = [
    {
        name: 'Hillsborough',
        address: '335 Amwell Road, Hillsborough NJ 08844',
        description: 'A church in New Jersey',
    },
    {
        name: 'Philadelphia',
        address: '660 E Township Line Road, Havertown PA 19083',
        description: 'A church in Philly',
    },
    {
        name: 'Elizabeth',
        address: '339 Elmora Ave, Elizabeth NJ 07208',
        description: 'Another church in New Jersey',
    },
];

const users = [
    {
        firstName: 'Shaun',
        lastName: 'Tung',
        email: 'shaun.tung@gmail.com',
        password: 'password',
        churchId: 1,
    },
    {
        firstName: 'Ted',
        lastName: 'Chen',
        email: 'ted.chen@gmail.com',
        password: 'password1',
        churchId: 1,
    },
    {
        firstName: 'Jonathan',
        lastName: 'Lee',
        email: 'Jonathan.Lee@gmail.com',
        password: 'password3',
        churchId: 2,
    },
];

const roles = [
    {
        name: 'AV',
        churchId: 1,
    },
    {
        name: 'Speaker',
        churchId: 1,
    },
    {
        name: 'Interpreting',
        churchId: 1,
    },
    {
        name: 'RE',
        churchId: 1,
    },
];
const tasks = [
    {
        date: '2020-05-06',
        userId: 1,
        roleId: 2,
        churchId: 3,
    },
    {
        date: '2020-05-06',
        userId: 2,
        roleId: 2,
        churchId: 1,
    },
    {
        date: '2020-05-06',
        userId: 3,
        roleId: 3,
        churchId: 1,
    },
    {
        date: '2020-04-06',
        userId: 1,
        roleId: 3,
        churchId: 1,
    },
    {
        date: '2020-03-06',
        userId: 1,
        roleId: 3,
        churchId: 1,
    },
];

async function seed() {
    await db.sequelize.sync({ force: true });
    console.log(green('db synced!'));

    const seedChurches = await Promise.all(
        churches.map((church) => {
            db.Church.create(church);
        }),
    );
    await new Promise((r) => setTimeout(r, 2000));
    const seedUsers = await Promise.all(
        users.map((user) => {
            db.User.create(user);
        }),
    );
    await new Promise((r) => setTimeout(r, 2000));
    const seedRoles = await Promise.all(
        roles.map((role) => {
            db.Role.create(role);
        }),
    );
    await new Promise((r) => setTimeout(r, 2000));
    const seedTasks = await Promise.all(
        tasks.map((task) => {
            db.Task.create(task);
        }),
    );

    console.log(blue(`seeded ${seedChurches.length} churches`));
    console.log(blue(`seeded ${seedUsers.length} users`));
    console.log(blue(`seeded ${seedRoles.length} roles`));
    console.log(blue(`seeded ${seedTasks.length} tasks`));
    console.log(blue(`seeded succesfully`));
}

async function runSeed() {
    console.log('seeding...');
    try {
        await seed();
    } catch (err) {
        console.error(red('Oh noes! Something went wrong!'));
        console.error(err);
    } finally {
        console.log('closing db connection');
        console.log('db connection closed');
    }
}

runSeed();
// module.exports = seed;
