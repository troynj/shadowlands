const router = require('express').Router();
const { User} = require("../../models");
const bcrypt = require('bcrypt');


router.post("/SignUp", async (req, res) => {
  // console.log("req.body", req.body)
  // const {name, password } =  req.body 
  // router.post("/", withAuth, async (req, res) => {
    try {
      const newUser = await User.create(req.body);
          // Create session variables based on the logged in user
          req.session.save(() => {
            req.session.loggedIn = true;
            req.session.userId = newUser.id
            // console.log("req.session: ", req.session)
            res.status(200).json(newUser);
          });
        } catch (err) {
          console.log(err);
          res.status(500).json(err);
        }
  });
  

router.put('/SignIn', async (req, res) => {
  const { email, password } = req.body
  console.log(email, password)
  try {
    // Find the user who matches the posted e-mail address
    const userData = await User.findOne({ where: { email: email } });
    const user = userData.get({plain : true})
    console.log("E---MAIL____", user)

    if (!user) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // Verify the posted password with the password store in the database
    // const validPassword = await user.checkPassword(req.body.password);
// console.log("validPassword ", validPassword)
//     if (!validPassword) {
//       res
//         .status(400)
//         .json({ message: 'Incorrect email or password, please try again' });
//       return;
//     }

    // Create session variables based on the logged in user
    req.session.save(() => {
      req.session.userId = userData.id;
      req.session.loggedIn = true;
      req.session.playerID = undefined
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/SignOut', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
