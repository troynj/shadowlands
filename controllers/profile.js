const router = require("express").Router();
const withAuth = require('../utils/auth');

const {
  Captured,
  Journey,
  Player,
  Prototype,
  User,
  Wild,
} = require("../models");

router.get("/:id", withAuth, async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id, {
      include: [
        {
          model: Player, include: [{ model: Journey}],          
        }
      ],
    });
    const account = user.get({ plain: true });
    console.log(account);
    res.render("dashboard", account);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
