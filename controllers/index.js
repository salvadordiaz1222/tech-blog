const router = require("express").Router();
const apiRoutes = require("./api");
const homeRoutes = require("./homeRoutes");
const withAuth = require("../utils/auth");
const articleRoutes = require("./api/articleRoutes");
const commentRoutes = require("./api/commentRoute");

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    return res.redirect("/articles");
  }
  res.render("login");
});
router.get("/signup", (req, res) => {
  console.log("This is session.login ", req.session.logged_in);
  if (req.session.logged_in) {
    return res.redirect("/articles");
  }
  res.render("signup");
});

router.use("/api", apiRoutes);
router.use("/api/articles", articleRoutes);
router.use("/api/comment", commentRoutes);
// Protected routes, need auth
router.use("/", withAuth, homeRoutes);

module.exports = router;
