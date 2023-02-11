const router = require("express").Router();
const { Captured, Location, Player, Prototype, Wild } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const prototypeArr = await Prototype.findAll();
    // const captured = capturedArr.map((captured) => captured.get({ plain: true }));

    res.status(200).json(prototypeArr);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  console.log(req.params.id);
  try {
    const prototypeArr = await Prototype.findByPk(id);
    console.log(prototypeArr);
    if (!prototypeArr) {
      res
        .status(404)
        .json({ message: "No monster prototype was found with that id!" });
      return;
    }

    res.status(200).json(prototypeArr);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const newPrototype = await Prototype.create(req.body);
    res.status(200).json(newPrototype);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  try {
    const { id } = req.params;
    const [updated] = await Prototype.update(req.body, { where: { id } });

    if (!updated) {
      return res
        .status(404)
        .json({ message: "No monster prototype found with that ID" });
    }

    const updatedPrototype = await Prototype.findByPk(id);
    return res.status(200).json(updatedPrototype);
  } catch (err) {
    return res.status(400).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete a prototype by its `id` value
  try {
    // Delete the prototype with the given `id` from the database
    const deleted = await Prototype.destroy({ where: { id: req.params.id } });

    // If the prototype is not found, return a 404 response with a message
    if (!deleted) {
      return res.status(404).json({ message: "prototype not found" });
    }

    // const updatedPrototype = await Prototype.findAll();
    // return res.status(200).json(updatedPrototype);
    
    // Return a success message in the response
    return res.status(200).json({ message: "prototype deleted successfully" });
  } catch (err) {
    // In case of any errors, return a 400 response with the error message
    return res.status(400).json(err);
  }
});

module.exports = router;
