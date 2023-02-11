const router = require("express").Router();
const { Captured, Journey, Player, Prototype, User, Wild } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const capturedArr = await Captured.findAll();
    // const captured = capturedArr.map((captured) => captured.get({ plain: true }));

    res.status(200).json(capturedArr);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  console.log(req.params.id);
  try {
    const capturedArr = await Captured.findByPk(id);
    console.log(capturedArr);
    if (!capturedArr) {
      res
        .status(404)
        .json({ message: "No captured monster was found with that id!" });
      return;
    }

    res.status(200).json(capturedArr);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const newCaptured = await Captured.create(req.body);
    res.status(200).json(newCaptured);
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
        .json({ message: "No captured monster with that ID can be updated with the infomation provided" });
    }

    const updatedCaptured = await Captured.findByPk(id);
    return res.status(200).json(updatedCaptured);
  } catch (err) {
    return res.status(400).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete a Captured by its `id` value
  try {
    // Delete the Captured with the given `id` from the database
    const deleted = await Captured.destroy({ where: { id: req.params.id } });

    // If the Captured is not found, return a 404 response with a message
    if (!deleted) {
      return res.status(404).json({ message: "Captured monster not found" });
    }

    // const updatedCaptured = await Captured.findAll();
    // return res.status(200).json(updatedCaptured);
    
    // Return a success message in the response
    return res.status(200).json({ message: "Captured monster deleted successfully" });
  } catch (err) {
    // In case of any errors, return a 400 response with the error message
    return res.status(400).json(err);
  }
});

module.exports = router;
