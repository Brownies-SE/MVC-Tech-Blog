const router = require("express").Router();
const { User, Post, Comment } = require("../models");

router.get("/", async (req, res) => {
  try {
    const allData = await Post.findAll({
      include: [{ model: User }, { model: Comment }],
    });
    if (!allData) {
      res.status(404).json({ message: "No data found" });
    }
    const data = allData.map((dataSet) => dataSet.get({ plain: true }));
    console.log(data);
    res.render("home", { data, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  // Otherwise, render the 'login' template
  res.render("login");
});

module.exports = router;
