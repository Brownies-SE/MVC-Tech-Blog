const router = require("express").Router();

const apiRoutes = require("./api");
const homeRoutes = require("./home-routes.js");
const dashboardRoutes = require("./dashBoard-routes.js");
const postLayoutRoutes = require("./postLayout.js");

router.use("/", homeRoutes);
router.use("/api", apiRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/postLayout", postLayoutRoutes);

module.exports = router;
