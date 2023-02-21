const router = require('express').Router();
const { User} = require("../../models");

router.post("/", async (req, res) => {
  // console.log("req.body", req.body)
  const { playerID } =  req.body 
  // router.post("/", withAuth, async (req, res) => {
    try {
          // Create session variables based on the logged in user
          req.session.save(() => {
            req.session.playerID = playerID
            console.log("req.session: ", req.session)
            res.status(200).json(playerID);
          });
        } catch (err) {
          console.log(err);
          res.status(500).json(err);
        }
  });
  
module.exports = router