const router = require("express").Router();
const withAuth = require('../../utils/auth');

const { Captured, Journey, Player, Prototype, User, Wild } = require("../../models");

router.get("/", withAuth, async (req, res) => {
// router.get("/", withAuth, async (req, res) => {
  try {
    const wildArr = await Wild.findAll();
    // const captured = capturedArr.map((captured) => captured.get({ plain: true }));

    res.status(200).json(wildArr);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", withAuth, async (req, res) => {
// router.get("/:id", withAuth, async (req, res) => {
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

router.post("/", withAuth, async (req, res) => {
// router.post("/", withAuth, async (req, res) => {
  try {
    const newWild = await Wild.create(req.body);
    res.status(200).json(newWild);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", withAuth, async (req, res) => {
// router.put("/:id", withAuth, async (req, res) => {
  // update a category by its `id` value
  try {
    const { id } = req.params;
    const [updated] = await Wild.update(req.body, { where: { id } });

    if (!updated) {
      return res
        .status(404)
        .json({ message: "No wild monster found with that ID" });
    }

    // const updatedWild = await Wild.findByPk(id);
    // return res.status(200).json(updatedWild);
    return res.status(200).json({ message: "Wild monster updated successfully" });

  } catch (err) {
    return res.status(400).json(err);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
// router.delete("/:id", withAuth, async (req, res) => {
  // delete a category by its `id` value
  try {
    // Delete the tag with the given `id` from the database
    const deleted = await Wild.destroy({ where: { id: req.params.id } });

    // If the tag is not found, return a 404 response with a message
    if (!deleted) {
      return res.status(404).json({ message: "Wild Monster not found" });
    }

    // const updatedWild = await Wild.findAll();
    // return res.status(200).json(updatedWild);

    // Return a success message in the response
    return res.status(200).json({ message: "Wild Monster deleted successfully" });
  } catch (err) {
    // In case of any errors, return a 400 response with the error message
    return res.status(400).json(err);
  }
});

module.exports = router;