const router = require('express').Router();
const { Arena, Captured, Journey, Player, Prototype, ShadowBeast, User, Wild } = require("../models");


router.get('/', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('auth');
});

module.exports = router;