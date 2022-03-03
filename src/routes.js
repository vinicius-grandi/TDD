const SessionController = require("./app/controllers/SessionController");
const DashboardController = require('./app/controllers/DashboardController');
const authMiddleware = require('./middleware/auth')

const routes = require("express").Router();

routes.post('/sessions', SessionController.store);

// middleware
routes.use(authMiddleware);

routes.get('/dashboard', (_req, res) => res.status(200).send());

module.exports = routes;
