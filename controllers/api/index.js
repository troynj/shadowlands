const router = require('express').Router();

const arena = require('./arena');
const auth = require('./auth');
const captured = require('./captured');
const journey = require('./journey');
const player = require('./player');
const prototype = require('./prototype');
const user = require('./user');
const wild = require('./wild');


router.use("/arena", arena)
router.use("/Auth", auth)
router.use("/captured", captured)
router.use("/journey", journey)
router.use("/player", player)
router.use("/prototype", prototype)
router.use("/user", user)
router.use("/wild", wild)

module.exports = router;