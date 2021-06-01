const router = require("express").Router();
const { Post, User, Comment } = require("../../models");
const sequelize = require("../../config/connection");

router.post("/:post_id", async (req, res) => {
  console.log(req.session);
  if (req.session.loggedIn) {
    req.body.user_id = req.session.user_id;
    const pData = await Post.findByPk(req.params.post_id);
    req.body.post_id = pData.id;

    const cData = await Comment.create(req.body);
    res.json(pData);
  } else {
    res.redirect("/login");
  }
});

module.exports = router;
