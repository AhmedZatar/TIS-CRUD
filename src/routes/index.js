const Router = require('express-promise-router');

const usersRouter = require('./users');

const router = Router();

router.use('/users', usersRouter);

module.exports = router;