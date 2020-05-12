const router = require('express').Router();
const { User, Task, Role, Church } = require('../db/models');
const { Op } = require('sequelize');
module.exports = router;

router.post('/authenticate', async (req, res, next) => {});

router.get('/getUser', async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: {
                id: req.query.id,
            },

            attributes: ['firstName', 'lastName', 'email'],
            include: [
                {
                    model: Church,
                    attributes: ['name'],
                },
            ],
        });
        res.json(user);
    } catch (err) {
        next(err);
    }
});

router.get('/getUserTasks', async (req, res, next) => {
    try {
        const tasks = await Task.findAll({
            where: {
                userId: req.query.id,
                date: {
                    [Op.between]: [
                        '2020-03-07T00:00:00.000Z',
                        '2020-04-30T00:00:00.000Z',
                    ],
                },
            },

            attributes: ['date'],
            include: [
                {
                    model: Role,
                    attributes: ['name'],
                },
                {
                    model: Church,
                    attributes: ['name'],
                },
            ],
        });
        res.json(tasks);
    } catch (err) {
        next(err);
    }
});

// include: [
//     {
//         model: Role,
//         attributes: ['name'],
//     },
//     {
//         model: User,
//         attributes: ['firstName', 'lastName'],
//     },
//     {
//         model: Church,
//         attributes: ['name'],
//     },
// ],
