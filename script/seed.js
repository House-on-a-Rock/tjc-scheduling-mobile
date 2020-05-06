const db = require('../server/db');
const { Church, User, Role, Duty } = require('../server/db/models');
const { green, red } = require('chalk');
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
		churchId: 1
	},
	{
		firstName: 'Ted',
		lastName: 'Chen',
		email: 'ted.chen@gmail.com',
		password: 'password1',
		churchId: 1
	},
	{
		firstName: 'Jonathan',
		lastName: 'Lee',
		email: 'Jonathan.Lee@gmail.com',
		password: 'password3',
		churchId: 2
	},
];

const roles = [
	{
		name: 'AV',
		churchId: 1
	},
	{
		name: 'Speaker',
		churchId: 1
	},
	{
		name: 'Interpreting',
		churchId: 1
	},
	{
		name: 'RE',
		churchId: 1
	}
]
async function seed() {
	await db.sync({ force: true });
	console.log('db synced!');

	const seedChurches = await Promise.all(
		churches.map((church) => {
			Church.create(church);
		}),
	);

	const seedUsers = await Promise.all(
		users.map((user) => {
			User.create(user);
		}),
	);

	const seedRoles = await Promise.all(
		roles.map((role) => {
			Role.create(role);
		}),
	)

	console.log(green(`seeded ${seedChurches.length} churches`));
	console.log(green(`seeded ${seedUsers.length} users`));
	console.log(green(`seeded succesfully`));
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
module.exports = seed;
