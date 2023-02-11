const router = require("express").Router();
const { Captured, Location, Player, Prototype, User, Wild } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const UserArr = await User.findAll();
    // const captured = capturedArr.map((captured) => captured.get({ plain: true }));

    res.status(200).json(UserArr);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const userArr = await User.findByPk(id);
    if (!userArr) {
      res.status(404).json({ message: "No User was found with that id!" });
      return;
    }

    res.status(200).json(userArr);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(200).json(newUser);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  try {
    const { id } = req.params;
    const [updated] = await User.update(req.body, { where: { id } });

    if (!updated) {
      return res.status(404).json({ message: "No User found with that ID" });
    }

    const updatedUser = await User.findByPk(id);
    return res.status(200).json(updatedUser);
  } catch (err) {
    return res.status(400).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  // delete a User by its `id` value
  try {
    // Delete the User with the given `id` from the database
    const deleted = await User.destroy({ where: { id: req.params.id } });

    // If the User is not found, return a 404 response with a message
    if (!deleted) {
      return res.status(404).json({ message: "User not found" });
    }

    // const updatedUser = await User.findAll();
    // return res.status(200).json(updatedUser);

    // Return a success message in the response
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    // In case of any errors, return a 400 response with the error message
    return res.status(400).json(err);
  }
});

module.exports = router;
