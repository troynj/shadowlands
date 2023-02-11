const router = require("express").Router();

const {
  Captured,
  Journey,
  Player,
  Prototype,
  ShadowBeast,
  User,
  Wild,
} = require("../models");

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { progress } = await Player.findByPk(id, { Player });
    // const {progress} = player.get({ plain: true });
    console.log(progress);

    res.render(...renderGamestate(progress, id));
  } catch (err) {
    res.status(500).json(err);
  }
});

async function renderGamestate(progress, p_id) {
  let html;
  let data;

  switch (progress) {
    case 0:
      //set handlbars template
      html = "intro";
      //get the current journey its associated data
      //associated data: intro description
      //associated data: wild monster array
      var introData = await Journey.findByPk(p_id, {
        include: [
          { model: Wild, where: { Journey_id: p_id } },
          { model: ShadowBeast, where: { Journey_id: p_id } },
        ],
      });
      const { intro, wilds, shadowbeasts } = introData.get({ plain: true });

      //randomly select index of wild monster and boss
      const opponent = Math.floor(Math.random() * wilds.length);
      const beast = Math.floor(Math.random() * shadowbeasts.length);

      //update table attributes
      await Journey.update(
        { opponent_id: wilds[opponent].id, beast_id: shadowbeasts[beast].id },
        { where: { id: p_id } }
      );

      console.log("Entered Case 0");
      console.log(p_id);
      console.log(opponent);
      console.log(shadowbeasts);

      // data = {wild: wilds[opponent], beast: shadowbeasts[beast]}

      break;
    case 1:
      html = "battle";
      var { conc } = await Journey.findByPk(id);
      data = conc;
      break;
    case 2:
      html = "conc";
      var { conc } = await Journey.findByPk(id);
      data = conc;
      console.log("Entered Case 2");
      break;
    default:
  }
  return {
    name: html,
    data,
  };
}

module.exports = router;
