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

router.get("/:id", async (req, res) => {
  try {
    const data = await Post.findOne({
      where: {
        id: req.params.id,
      },
      include: [{ model: User }],
    });

    if (!data) {
      res.status(404).json({ message: "No post found with that Id" });
      return;
    }
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const data = await Post.update(
      {
        title: req.body.title,
        post_text: req.body.post_text,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (!data) {
      res.status(404).json({ message: "No post found with that Id" });
      return;
    }
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Needs more
// router.delete("/:id", async (req, res) => {
//   const data = await Post.findOne({
//     where: { id: req.params.id },
//     include: { model: Comment },
//   });
// });

module.exports = router;
