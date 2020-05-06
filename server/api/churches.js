const router = require('express').Router();
const { Church } = require('../db/models');
module.exports = router;

router.get('/getAll', async (req, res, next) => {
	try {
		const church = await Church.findAll({
			attributes: ['name', 'address', 'description'],
		});
		res.status(200).json(church);
	} catch (err) {
		next(err);
	}
});

router.post('/createChurch', async (req, res, next) => {
	try {
		const church = await Church.create({
			name: req.body.name,
			address: req.body.address,
			description: req.body.description,
		});
		res.send(church);
	} catch (err) {
		next(err);
	}
});
