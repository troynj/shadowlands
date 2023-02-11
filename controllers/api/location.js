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
        .json({ message: "No location found with that id!" });
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

router.delete("/:id", async (req, res) => {
  // delete a Location by its `id` value
  try {
    // Delete the Location with the given `id` from the database
    const deleted = await Location.destroy({ where: { id: req.params.id } });

    // If the Location is not found, return a 404 response with a message
    if (!deleted) {
      return res.status(404).json({ message: "Location not found" });
    }

    // const updatedLocation = await Location.findAll();
    // return res.status(200).json(updatedLocation);
    
    // Return a success message in the response
    return res.status(200).json({ message: "Location deleted successfully" });
  } catch (err) {
    // In case of any errors, return a 400 response with the error message
    return res.status(400).json(err);
  }
});

module.exports = router;