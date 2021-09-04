const router = require("express").Router();
const { BlogPosts, User, Comment } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const dbBlogPosts = await BlogPosts.findAll({ include: [{ model: User }] });
    res.json(dbBlogPosts);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  const { post_title, content, user_id } = req.body;
  if (!post_title || !content || !user_id)
    throw new Error("You must provide title, content and user id");
  try {
    const newPost = await BlogPosts.create({
      user_id,
      post_title,
      content,
    });
    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const postData = await BlogPosts.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!postData) {
      res.status(404).json({ message: "No blog found with this id" });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
