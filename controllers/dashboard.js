const router = require("express").Router();
const { Captured, Location, Player, Prototype, Wild } = require("../models");

router.get("/", async (req, res) => {
  try {
    const { id } = req.params

    const user = await User.findByPk(id, {
      include: [
        {
          model: 'player',
        }
      ]
    })

    const account = user.get({ plain: true });
console.log(account)
    res.render('dashboard', account);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router