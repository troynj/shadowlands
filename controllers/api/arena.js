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
} = require("../../models");

router.get("/", async (req, res) => {
  try {
    const arenaArr = await Arena.findAll();
    // const arena = arenaArr.map((arena) => arena.get({ plain: true }));

    res.status(200).json(arenaArr);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  console.log(req.params.id);
  try {
    const arenaArr = await Arena.findByPk(id);
    console.log(arenaArr);
    if (!arenaArr) {
      res.status(404).json({ message: "No arena was found with that id!" });
      return;
    }

    res.status(200).json(arenaArr);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const { id } = req.body;
    const { type } = req.body;
    const opp =
      type === "Wild"
        ? await Wild.findByPk(id)
        : await ShadowBeast.findByPk(id);

    if (!opp) {
      res.status(404).json({ message: "No opponent found with that id!" });
      return;
    }
    const opponent = opp.get({ plain: true });
    console.log("opp :", opponent)

    // const playerData = await Player.findByPk(req.session.player.id, {
    const playerData = await Player.findByPk(5, {
      include: [{ model: Captured, where: { id: 5 } }],
    });

    if(!playerData) {
    res.status(404).json({ message: "No player/captured monster found with that id!" });
    return;
  }
    const player = playerData.get({ plain: true });
console.log(player)
    const newArena = await Arena.create({
      captured_attack: player.captured.attack,
      captured_health: player.captured.health,
      opponent_attack: opponent.attack,
      opponent_health: opponent.health,
    });
    res.status(200).json(newArena);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update an arena by its `id` value
  try {
    const { id } = req.params;
    const [updated] = await Arena.update(req.body, { where: { id } });

    if (!updated) {
      return res
        .status(404)
        .json({
          message:
            "No arena with that ID can be updated with the infomation provided",
        });
    }

    const updatedArena = await Arena.findByPk(id);
    return res.status(200).json(updatedArena);
  } catch (err) {
    return res.status(400).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete an arena by its `id` value
  try {
    // Delete the arena with the given `id` from the database
    const deleted = await Arena.destroy({ where: { id: req.params.id } });

    // If the arena is not found, return a 404 response with a message
    if (!deleted) {
      return res.status(404).json({ message: "Arena not found" });
    }

    // const updatedA rena = await arena.findAll();
    // return res.status(200).json(updatedArena);

    // Return a success message in the response
    return res.status(200).json({ message: "Arena deleted successfully" });
  } catch (err) {
    // In case of any errors, return a 400 response with the error message
    return res.status(400).json(err);
  }
});

module.exports = router;
