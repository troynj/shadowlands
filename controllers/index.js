const router = require('express').Router();

const landing = require("./landing")
const dashboard = require("./profile")
const journey = require("./journey")
const selectMonster = require("./selectMonster")
const api = require('./api');
const auth = require('./auth');
const about = require('./about')

router.use("/", landing)
router.use("/Dashboard", dashboard)
router.use("/SelectMonster", selectMonster)
router.use("/Journey", journey)
router.use("/About", about)
router.use("/api", api)
router.use("/Auth", auth)

module.exports = router;