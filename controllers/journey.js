const router = require("express").Router();
const {
  Arena,
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
    const battleData = await renderGamestate(id);
    // console.log("Battle Data: ", ...battleData)
    res.render(...battleData);
  } catch (err) {
    res.status(500).json(err);
  }
});

async function renderGamestate(p_id) {
  let html;
  let data;
  //rec.session.id
  const { progress, captured } = await Player.findByPk(5, {
    //rec.session.id
    include: [{ model: Captured, where: { player_id: 5 } }],
  });
const cap = captured.get({plain : true})

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
      console.log("p_id", p_id);
      console.log("opponent", opponent);
      console.log("shadowbeat", shadowbeasts);

      html = "intro";
      data = {
        intro,
        wild_id: wilds[opponent].id,
        beast_id: shadowbeasts[beast].id,
      };
      //console.log({intro, wild_id: wilds[opponent].id, beast_id: shadowbeasts[beast].id})
      break;

    case 1:
      //const arenaData = await Arena.findByPk(p_id);
      //html = "arena";
      //data = arenaData.get({ plain: true });

      const arenaArr = await Arena.findAll();
      html = "arena";
      data = arenaArr[arenaArr.length - 1].get({ plain: true });

      console.log("Entered Case 1", data);
      break;
    case 2:
      var { conc } = await Journey.findByPk(p_id);

      html = "conc";
      data = { conc, cap };
console.log(" ::::::::D....A......T........A.......data:::::::" , data)
      break;
    default:
  }
  // console.log( "return value: ", html.toString() , " + " , data, "||")
  return [html, data];
}

module.exports = router;
