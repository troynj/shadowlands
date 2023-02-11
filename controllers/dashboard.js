const router = require("express").Router();
const { Captured, Location, Player, Prototype, Wild } = require("../models");

router.get("/", async (req, res) => {
  try {
    const wildArr = await Wild.findAll();
    // const captured = capturedArr.map((captured) => captured.get({ plain: true }));

    res.render('dashboard', wildArr);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router