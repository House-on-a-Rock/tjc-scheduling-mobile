const router = require('express').Router();
const { User } = require('../db/models');
module.exports = router;

router.post('/authenticate', async (req, res, next) => {});

router.get('/getUser', async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: {
                id: req.query.id,
            },
            attributes: ['firstName', 'lastName', 'email', 'tasks'],
        });
        res.json(user);
    } catch (err) {
        next(err);
    }
});
