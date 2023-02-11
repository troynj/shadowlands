const router = require("express").Router();
const { Captured, Location, Player, Prototype, Wild } = require("../../models");

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
      res
        .status(404)
        .json({ message: "No monster prototype was found with that id!" });
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
  // update a category by its `id` value
  try {
    const { id } = req.params;
    const [updated] = await Player.update(req.body, { where: { id } });

    if (!updated) {
      return res
        .status(404)
        .json({ message: "No player found with that ID" });
    }

    const updatedPlayer = await Player.findByPk(id);
    return res.status(200).json(updatedPlayer);
  } catch (err) {
    return res.status(400).json(err);
  }
});

module.exports = router;