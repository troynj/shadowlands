const router = require('express').Router();

const battle = require('./battle');
const dashboard = require('./dashboard');
const homepage = require('./homepage');
const location = require('./location');
const login = require('./login');
const api = require('./api');


router.use("/", homepage)
router.use("/battle", battle)
router.use("/dashboard", dashboard)
router.use("/location", location)
router.use("/login", login)
router.use("/api", api)

module.exports = router;