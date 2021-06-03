const router = require("express").Router();
const { User } = require("../../models");

// router.post("/", async (req, res) => {
//   try {
//     const dbUserData = await User.create({
//       username: req.body.username,
//       email: req.body.email,
//       password: req.body.password,
//     });

//     res.session.save(() => {
//       req.session.loggedIn = true;
//       res.status(200).json(dbUserData);
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

router.post("/signup", async (req, res) => {
  try {
    const dbUserData = await User.create(req.body);

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.user_id = dbUserData.id;
      res
        .status(200)
        .json({ user: dbUserData, message: "You are now logged in!" });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    console.log(req.body);
    const dbUserData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!dbUserData) {
      res.status(400).json({ message: "Didnt get the data" });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);
    console.log(validPassword);
    if (!validPassword) {
      res.status(400).json({ message: "password not valid" });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.user_id = dbUserData.id;

      res
        .status(200)
        .json({ user: dbUserData, message: "You are now logged in!" });
    });
    // res.redirect("/dashboard");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/logout", (req, res) => {
  // When the user logs out, destroy the session
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.redirect("/login");
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
