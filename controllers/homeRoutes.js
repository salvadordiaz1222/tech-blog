const router = require("express").Router();
const { BlogPosts, Comment, User } = require("../models");

router.get("/articles/:id", async (req, res) => {
  try {
    const dbBlogInfo = await BlogPosts.findOne({
      where: { id: req.params.id },
      include: [{ model: User }, { model: Comment, all: true, nested: true }],
    });
    const blogInfo = dbBlogInfo.get({ plain: true });
    console.log("this is blog info data", blogInfo);
    const { comments, post_title, content, id, user } = blogInfo;

    res.render("articleInfo", {
      post_title,
      content,
      id,
      comments,
      user,
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.get("/articles", async (req, res, next) => {
  try {
    const dbBlogPosts = await BlogPosts.findAll({ include: [{ model: User }] });
    console.log({ dbBlogPosts });
    const blogPosts = dbBlogPosts.map((article) =>
      article.get({ plain: true })
    );
    res.render("article", {
      articles: blogPosts,
    });
  } catch (e) {
    res.status(400).json(e.message);
  }
});

module.exports = router;
