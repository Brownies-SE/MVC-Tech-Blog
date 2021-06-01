const router = require("express").Router();
const { Post, User, Comment } = require("../../models");
const sequelize = require("../../config/connection");

router.post("/", async (req, res) => {
  console.log(req.session);
  if (req.session.loggedIn) {
    req.body.user_id = req.session.user_id;
    const pData = await Post.create(req.body);
    res.json(pData);
  } else {
    res.redirect("/login");
  }
});

router.get("/", async (req, res) => {
  try {
    const pData = await Post.findAll({
      where: { user_id: req.session.user_id },
    });
    const allData = pData.map((dataSet) => dataSet.get({ plain: true }));
    console.log(allData);
    res.render("allData", {
      allData,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
