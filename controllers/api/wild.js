const router = require("express").Router();
const { Captured, Location, Player, Prototype, Wild } = require("../../models");

router.get("/", async (req, res) => {
    try {
      const wildData = await Blog.findAll({
        include: [
          { model: Location },
          { model: Prototype },
        ]
      });
      const wild = wildData.map((blog) => wild.get({ plain: true }));
  
      res.json({wild});
    } catch (err) {
      res.status(500).json(err);
    }
  });