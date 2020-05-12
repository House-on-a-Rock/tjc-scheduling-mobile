import express from 'express';
import db from '../index';

const router = express.Router();

module.exports = router;

router.get('/getAllUsers', async (req, res, next) => {
    try {
        const users = await db.User.findAll({
            attributes: ['firstName', 'lastName', 'email'],
        });
        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
});

// router.get('/getUser', async (req, res, next) => {
//     try {
//         const user = await db.User.findOne({
//             where: {
//                 id: req.query.id,
//             },
//             attributes: ['firstName', 'lastName', 'email'],
//         });
//         res.json(user);
//     } catch (err) {
//         next(err);
//     }
// });
