const router = require("express").Router();
const { Captured, Journey, Player, Prototype, User, Wild } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const playerArr = await Player.findAll();
    // const captured = capturedArr.map((captured) => captured.get({ plain: true }));

    res.status(200).json(playerArr);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  console.log(req.params.id);
  try {
    const playerArr = await Player.findByPk(id);
    console.log(playerArr);
    if (!playerArr) {
      res.status(404).json({ message: "No player was found with that id!" });
      return;
    }

    res.status(200).json(playerArr);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const newPlayer = await Player.create(req.body);
    res.status(200).json(newPlayer);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  console.log("---E-N-T-E-R-E-D-----P-L-A-Y-E-R-----U-P-D-A-T-E---")
  // update a category by its `id` value
  try {
    const { id } = req.params;
    const [updated] = await Player.update(req.body, { where: { id } });

    if (!updated) {
      return res.status(404).json({ message: "No player found with that ID" });
    }

    const updatedPlayer = await Player.findByPk(id);
    console.log("updatedPlayer", updatedPlayer)
    return res.status(200).json(updatedPlayer);
  } catch (err) {
    return res.status(400).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete a player by its `id` value
  try {
    // Delete the player with the given `id` from the database
    const deleted = await Player.destroy({ where: { id: req.params.id } });

    // If the player is not found, return a 404 response with a message
    if (!deleted) {
      return res.status(404).json({ message: "Player not found" });
    }

    // const updatedPlayer = await Player.findAll();
    // return res.status(200).json(updatedPlayer);

    // Return a success message in the response
    return res.status(200).json({ message: "Player deleted successfully" });
  } catch (err) {
    // In case of any errors, return a 400 response with the error message
    return res.status(400).json(err);
  }
});

module.exports = router;
