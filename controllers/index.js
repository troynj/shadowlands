const router = require('express').Router();

const landing = require("./landing")
const dashboard = require("./dashboard")
const journey = require("./journey")
const api = require('./api');

router.use("/", landing)
router.use("/Dashboard", dashboard)
router.use("/Journey", journey)
router.use("/About", dashboard)
router.use("/api", api)

module.exports = router;