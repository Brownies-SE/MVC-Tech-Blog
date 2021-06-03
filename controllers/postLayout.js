const router = require("express").Router();
const { User, Post, Comment } = require("../models");

router.get("/:id", async (req, res) => {
  //   try {
  const allData = await Post.findOne({
    where: { id: req.params.id },
    include: [{ model: User }, { model: Comment, include: [{ model: User }] }],
  });
  if (!allData) {
    res.status(404).json({ message: "No data found" });
  }
  const data = allData.get({ plain: true });
  console.log("Detail:", data);
  console.log(req.session);
  console.log("Comments", data.comments);
  console.log("username", data.user.username);
  res.render("postLayout", {
    title: data.title,
    comments: data.comments,
    username: data.user.username,
    loggedIn: req.session.loggedIn,
  });
  //   } catch (err) {
  //     res.status(500).json(err);
  //   }
});
module.exports = router;
