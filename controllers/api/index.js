const router = require("express").Router();
const { User } = require("../../models");

router.post("/login", async (req, res, next) => {
  console.log("THIS IS REQ.BODY", req.body);
  const { email, password } = req.body;
  try {
    const userData = await User.findOne({ where: { email } });
    if (!userData) {
      throw new Error("Incorrect email or password");
    }
    const validPassword = await userData.checkPassword(password);
    if (!validPassword) {
      throw new Error("Incorrect email or password");
    }
    req.session.save(async () => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      req.session.user_name = userData.name;

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (e) {
    console.log({ e });
    res.status(400).json(e.message);
  }
});

router.post("/signup", async (req, res, next) => {
  console.log("FIRST", req.body);
  try {
    const { email, name, password } = req.body;
    if (!email || !name || !password)
      throw new Error("You must provide email, name and password");
    const userData = await User.create({ email, name, password });
    console.log("This is User data", userData);
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      req.session.user_name = userData.name;

      res.json(userData);
      // res.render("profile", { projects });
    });
  } catch (e) {
    res.status(400).json(e.message);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    // Remove the session variables
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
