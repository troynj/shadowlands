const router = require("express").Router();
const { Captured, Location, Player, Prototype, Wild } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const locationArr = await Location.findAll();
    // const captured = capturedArr.map((captured) => captured.get({ plain: true }));

    res.status(200).json(locationArr);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get("/:id", async (req, res) => {
  const { id } = req.params;
  console.log(req.params.id);
  try {
    const locationArr = await Location.findByPk(id);
    console.log(locationArr);
    if (!locationArr) {
      res
        .status(404)
        .json({ message: "No monster prototype was found with that id!" });
      return;
    }

    res.status(200).json(locationArr);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const newLocation = await Location.create(req.body);
    res.status(200).json(newLocation);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const newLocation = await Location.create(req.body);
    res.status(200).json(newLocation);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Location.update(req.body, { where: { id }});

    if (!updated) {
      return res
        .status(404)
        .json({ message: "No location with that ID can be updated with the given information"});
    }

    const updatedLocation = await Location.findByPk(id);
    return res.status(200).json(updatedLocation);
  } catch (err) {
    return res.status(400).json(err);
  }
});

module.exports = router;