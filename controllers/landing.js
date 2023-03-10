const router = require("express").Router();
const withAuth = require('../utils/auth');

const { Arena, Captured, Journey, Player, Prototype, ShadowBeast, User, Wild } = require("../models");

router.get("/", withAuth, async (req, res) => {
  try {
    const wildArr = await Wild.findAll();
    // const captured = capturedArr.map((captured) => captured.get({ plain: true }));

    res.render('landing', {wildArr, sess : req.session});
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router