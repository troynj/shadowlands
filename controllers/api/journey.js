const router = require("express").Router();
const withAuth = require('../../utils/auth');


const { Captured, Journey, Player, Prototype, User, Wild } = require("../../models");

router.get("/", withAuth, async (req, res) => {
  try {
    const JourneyArr = await Journey.findAll();
    // const captured = capturedArr.map((captured) => captured.get({ plain: true }));

    res.status(200).json(JourneyArr);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get("/:id", withAuth, async (req, res) => {
  const { id } = req.params;
  console.log(req.params.id);
  try {
    const JourneyArr = await Journey.findByPk(id);
    console.log(JourneyArr);
    if (!JourneyArr) {
      res
        .status(404)
        .json({ message: "No Journey found with that id!" });
      return;
    }

    res.status(200).json(JourneyArr);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", withAuth, async (req, res) => {
  try {
    const newJourney = await Journey.create(req.body);
    res.status(200).json(newJourney);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/", withAuth, async (req, res) => {
  try {
    const newJourney = await Journey.create(req.body);
    res.status(200).json(newJourney);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", withAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Journey.update(req.body, { where: { id }});

    if (!updated) {
      return res
        .status(404)
        .json({ message: "No Journey with that ID can be updated with the given information"});
    }

    const updatedJourney = await Journey.findByPk(id);
    return res.status(200).json(updatedJourney);
  } catch (err) {
    return res.status(400).json(err);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  // delete a Journey by its `id` value
  try {
    // Delete the Journey with the given `id` from the database
    const deleted = await Journey.destroy({ where: { id: req.params.id } });

    // If the Journey is not found, return a 404 response with a message
    if (!deleted) {
      return res.status(404).json({ message: "Journey not found" });
    }

    // const updatedJourney = await Journey.findAll();
    // return res.status(200).json(updatedJourney);
    
    // Return a success message in the response
    return res.status(200).json({ message: "Journey deleted successfully" });
  } catch (err) {
    // In case of any errors, return a 400 response with the error message
    return res.status(400).json(err);
  }
});

module.exports = router;