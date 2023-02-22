const router = require("express").Router();

const { Arena, Captured, Journey, Player, Prototype, ShadowBeast, User, Wild } = require("../models");

router.get("/", async (req, res) => {
  try {
    res.render('about', {sess: req.session});
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router