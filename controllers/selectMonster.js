const router = require("express").Router();
const withAuth = require('../utils/auth');

const {
  Captured,
  Journey,
  Player,
  Prototype,
  User,
  Wild,
} = require("../models");

router.get("/", async (req, res) => {
  try {
    const monsterDataExt = await Prototype.findAll()
    const monProto = monsterDataExt.map(el =>  el.get({plain :true}))
    // console.log("monsterDataExt", monsterDataExt)
    console.log("monProto", monProto)
    res.render("selectMonster", { monProto, sess : req.session })
  }
  catch(err){}
})

module.exports = router