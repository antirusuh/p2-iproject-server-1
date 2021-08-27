const routes = require('express').Router();
const users = require('./user');
const petitions = require('./petition');
const signs = require('./sign');
const public = require('./public');
const { authentication } = require('../middlewares/auth');

routes.use('/', users)
routes.use('/public', public)

routes.use(authentication)

routes.use('/petitions', petitions)
routes.use('/signs', signs)

module.exports = routes