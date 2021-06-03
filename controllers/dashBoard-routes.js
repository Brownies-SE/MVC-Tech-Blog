const router = require("express").Router();
const { User, Post, Comment } = require("../models");

router.get("/", async (req, res) => {
  // try {
  const pData = await Post.findAll({
    where: { user_id: req.session.user_id },
    include: [{ model: User }, { model: Comment }],
  });
  console.log("text", pData);
  const allData = pData.map((dataSet) => dataSet.get({ plain: true }));

  res.render("dashboard", {
    allData,
    loggedIn: req.session.loggedIn,
  });
  // } catch (err) {
  //   res.status(500).json(err);
  // }
});

module.exports = router;
