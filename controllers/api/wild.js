const router = require("express").Router();
const { Captured, Location, Player, Prototype, Wild } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const wildArr = await Wild.findAll();
    // const captured = capturedArr.map((captured) => captured.get({ plain: true }));

    res.status(200).json(wildArr);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  console.log(req.params.id);
  try {
    const wildArr = await Wild.findByPk(id);
    console.log(wildArr);
    if (!wildArr) {
      res
        .status(404)
        .json({ message: "No wild monster was found with that id!" });
      return;
    }

    res.status(200).json(wildArr);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const newWild = await Wild.create(req.body);
    res.status(200).json(newWild);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  try {
    const { id } = req.params;
    const [updated] = await Captured.update(req.body, { where: { id } });

    if (!updated) {
      return res
        .status(404)
        .json({ message: "No captured monster not found with that ID" });
    }

    const updatedCaptured = await Captured.findByPk(id);
    return res.status(200).json(updatedCaptured);
  } catch (err) {
    return res.status(400).json(err);
  }
});

module.exports = router;