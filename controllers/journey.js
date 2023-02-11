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
      //get the current journey its associated data
      //associated data: intro description
      //associated data: wild monster array
      const introData = await Journey.findByPk(p_id, {
        include: [
          { model: Wild, where: { journey_id: p_id } },
          { model: ShadowBeast, where: { journey_id: p_id } },
        ],
      });
      const { intro, wilds, shadowbeasts } = introData.get({ plain: true });

      //randomly select index of wild monster and boss
      const opponent = Math.floor(Math.random() * wilds.length);
      const beast = Math.floor(Math.random() * shadowbeasts.length);

      //update table attributes
      // await Journey.update(
      //   { opponent_id: wilds[opponent].id, beast_id: shadowbeasts[beast].id },
      //   { where: { id: p_id } }
      // );

      console.log("Entered Case 0");
      console.log(p_id);
      console.log(opponent);
      console.log(shadowbeasts);

      html = "intro";
      data = {
        intro,
        wild_id: wilds[opponent].id,
        beast_id: shadowbeasts[beast].id,
      };
      //console.log({intro, wild_id: wilds[opponent].id, beast_id: shadowbeasts[beast].id})
      break;

    case 1:
      const arenaData = await arena.findByPk(id);
      html = "battle";
      data = arenaData.get({ plain: true });

      break;
    case 2:
      var { conc } = await Journey.findByPk(id);
      const arenaConc = await arena.findByPk(id);
      const stats = arenaConc.get({ plain: true });

      html = "conc";
      data = { conc, stats };
      // console.log("Entered Case 2");
      break;
    default:
  }
  return [html, data];
}

module.exports = router;
