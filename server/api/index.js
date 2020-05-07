const router = require('express').Router();
module.exports = router;

router.use('/churches', require('./churches'));
router.use('/users', require('./users'));
router.use('/authentication', require('./authentication'));

router.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});
