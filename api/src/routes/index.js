const { Router } = require('express');
const countriesRoute = require('./country.js');
const activityRoute = require('./activity.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use(countriesRoute);
router.use(activityRoute);

module.exports = router;
