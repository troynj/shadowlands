const router = require("express").Router();
const withAuth = require("../utils/auth");

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

router.get("/:id", withAuth, async (req, res) => {
  try {
    console.log("ENTERED JOURNEY")
    // const { playerID } = req.body
    const { id } = req.params;
    const battleData = await renderGamestate(id);
    // console.log("Battle Data: ", ...battleData)
    res.render(...battleData);
  } catch (err) {
    res.status(500).json(err);
  }
});

async function renderGamestate(locationID) {
  console.log("ENTERED JOURNEY renderGamestate")
  console.log("Inside Journey, req.session: ", req.session)
  let html;
  let data;
  
  const { playerID } = req.session
  const { progress, captured } = await Player.findByPk(playerID, {
    //rec.session.id
    include: [{ model: Captured, where: { player_id: playerID } }],
  });
  const cap = captured.get({ plain: true });
  console.log("deconstructed progress, captured:", progress, ", ", cap);

  switch (progress) {
    case 0:
      //set handlbars template
      //get the current journey its associated data
      //associated data: intro description
      //associated data: wild monster array
      const introData = await Journey.findByPk(locationID, {
        include: [
          { model: Wild, where: { journey_id: locationID } },
          { model: ShadowBeast, where: { journey_id: locationID } },
        ],
      });
      const { intro, wilds, shadowbeasts } = introData.get({ plain: true });

      //randomly select index of wild monster and boss
      const opponent = Math.floor(Math.random() * wilds.length);
      const beast = Math.floor(Math.random() * shadowbeasts.length);

      //update table attributes
      // await Journey.update(
      //   { opponent_id: wilds[opponent].id, beast_id: shadowbeasts[beast].id },
      //   { where: { id: locationID } }
      // );

      // console.log("Entered Case 0");
      // console.log("locationID", locationID);
      // console.log("opponent", opponent);
      // console.log("shadowbeat", shadowbeasts);

      html = "intro";
      data = {
        intro,
        wild_id: wilds[opponent].id,
        beast_id: shadowbeasts[beast].id,
      };
      //console.log({intro, wild_id: wilds[opponent].id, beast_id: shadowbeasts[beast].id})
      break;

    case 1:
      //const arenaData = await Arena.findByPk(locationID);
      //html = "arena";
      //data = arenaData.get({ plain: true });

      const arenaArr = await Arena.findAll();
      html = "arena";
      data = arenaArr[arenaArr.length - 1].get({ plain: true });

      console.log("Entered Case 1", data);
      break;
    case 2:
      var { conc } = await Journey.findByPk(locationID);

      html = "conc";
      data = { conc, cap };
      console.log(" ::::::::D....A......T........A.......data:::::::", data);
      break;
    default:
  }
  // console.log( "return value: ", html.toString() , " + " , data, "||")
  return [html, data];
}

module.exports = router;
