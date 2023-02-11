const router = require('express').Router();

const captured = require('./captured');
const location = require('./location');
const player = require('./player');
const prototype = require('./prototype');
const wild = require('./wild');


router.use("/captured", captured)
router.use("/location", location)
router.use("/player", player)
router.use("/prototype", prototype)
router.use("/wild", wild)

module.exports = router;