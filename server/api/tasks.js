const router = require('express').Router();
const { Task } = require('../db/models');
module.exports = router;

router.get('/getAllUserTasks', async (req, res, next) => {
    try {
        const task = await Task.findAll({
            // where: { user: req.body.user },
        });
        res.status(200).json(task);
    } catch (err) {
        next(err);
    }
});

router.post('/createTask', async (req, res, next) => {
    try {
        console.log('createTask', req);
        const task = await Task.create({
            date: req.body.date,
            user: req.body.user,
            role: req.body.role,
            church: req.body.church,
        });
        res.send(church);
    } catch (err) {
        next(err);
    }
});
