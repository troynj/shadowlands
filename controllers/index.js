const router = require('express').Router();

const landing = require("./landing")
const dashboard = require("./profile")
const journey = require("./journey")
const api = require('./api');
const auth = require('./auth');

router.use("/", landing)
router.use("/Dashboard", dashboard)
router.use("/Journey", journey)
router.use("/About", dashboard)
router.use("/api", api)
router.use("/Auth", auth)

module.exports = router;