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

    const { progress } = await Player.findByPk(3);
    // const {progress} = player.get({ plain: true });
    console.log("progress", progress);

    // html = "intro";
    // data = {
    //   intro,
    //   wild_id: wilds[opponent].id,
    //   beast_id: shadowbeasts[beast].id,
    // };

    // html = "Arena";
    // data = ArenaData.get({ plain: true });

    // html = "conc";
    // data = { conc, stats };
console.log("check this: ")
const battleData = await renderGamestate(progress, id)
console.log("Battle Data: ", ...battleData)
    res.render(...battleData);
    // res.render("arena", {progress})
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
        
        html = "arena";
        data = {
          captured_attack: 123,
          captured_health: 123,
          opponent_attack: 123,
          opponent_health: 123,
        };
        
        console.log("Entered Case 1", data);
        break;
        case 2:
          var { conc } = await Journey.findByPk(p_id);
          // const arenaConc = await Arena.findByPk(p_id);
          // const stats = arenaConc.get({ plain: true });
          stats = {
            captured_attack: 123,
            captured_health: 123,
            opponent_attack: 123,
            opponent_health: 123,
          };
          html = "conc";
          data = { conc, stats };
          // console.log("Entered Case 2");
          console.log("Entered Case 2", data);
          break;
    default:
  }
  // console.log( "return value: ", html.toString() , " + " , data, "||")
  return [html, data];
}

module.exports = router;
