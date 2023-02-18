const router = require('express').Router();
const { User} = require("../../models");

router.post("/player", async (req, res) => {
  console.log("req.body", req.body)
  // const {name, password } =  req.body 
  // router.post("/", withAuth, async (req, res) => {
    try {
      const newUser = await User.create(req.body);
          // Create session variables based on the logged in user
          req.session.save(() => {
            req.session.playerId = player.id
            console.log("req.session: ", req.session)
            res.status(200).json(newUser);
          });
        } catch (err) {
          console.log(err);
          res.status(500).json(err);
        }
  });
  

router.put('/player', async (req, res) => {
  try {
    // Find the user who matches the posted e-mail address
    const userData = await User.findOne({ where: { id: req.body.id } });
    const user = userData.get({plain : true})

    if (!user) {
      res
        .status(400)
        .json({ message: 'Incorrect player id, please try again' });
      return;
    }

    // Verify the posted password with the password store in the database
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect player id, please try again' });
      return;
    }

    // Create session variables based on the logged in user
    req.session.save(() => {
      req.session.playerId = player.id
      res.json({ user: userData, message: 'You are now loaded in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});