const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

module.exports = router

// const authController = require("./api/authController");
// const loginRoute = require("./api/loginRoute");

// module.exports = {
//     authController,
//     loginRoute,
// };
