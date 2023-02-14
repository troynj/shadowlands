const router = require('express').Router();
const withAuth = require('../../utils/auth');

const { Arena, Captured, Journey, Player, Prototype, ShadowBeast, User, Wild } = require("../../models");

router.post('/', (req, res) => {
  if (req.session.logged_in) {
    // Remove the session variables
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;