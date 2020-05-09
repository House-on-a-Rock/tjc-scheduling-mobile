const router = require('express').Router();
const { User } = require('../db/models');
module.exports = router;

router.get('/getAllUsers', async (req, res, next) => {
    try {
        const users = await User.findAll({
            attributes: ['firstName', 'lastName', 'email'],
        });
        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
});

router.get('/getUser', async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: {
                id: req.query.id,
            },
            attributes: ['firstName', 'lastName', 'email'],
        });
        res.json(user);
    } catch (err) {
        next(err);
    }
});
