import express, { Request, Response, NextFunction } from 'express';
import db from '../index';

const router = express.Router();
module.exports = router;

router.get(
    '/getAllUserTasks',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const task = await db.Task.findAll({
                where: { user: req.body.user },
            });
            res.status(200).json(task);
        } catch (err) {
            next(err);
        }
    },
);

router.post('/createTask', async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log('createTask', req);
        const task = await db.Task.create({
            date: req.body.date,
            // user: req.body.user,
            // role: req.body.role,
            // church: req.body.church,
        });
        res.send(task);
    } catch (err) {
        next(err);
    }
});
