const express = require('express');
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', SessionController.create);

/**
 * Ongs
 */
routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

/**
 * Profiles
 */
routes.get('/profile', ProfileController.index);

/**
 * incidents
 */
routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);


module.exports = routes;