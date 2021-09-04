const router = require("express").Router();
const { Comment } = require("../../models");
const { BlogPosts } = require("../../models");

router.post("/", async (req, res) => {
  const { content, user_id, blogPost_id } = req.body;
  if (!content || !user_id || !blogPost_id)
    throw new Error("You must provide content, user id and blog post id");
  try {
    const newComment = await Comment.create({
      content,
      user_id,
      blogPost_id,
    });
    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/article/:id", async (req, res) => {
  try {
    const articleComments = await BlogPosts.findOne({
      where: { id: req.params.id },
      include: [{ model: Comment }],
    });
    console.log({ articleComments });
    const article = articleComments.get({ plain: true });

    res.json(article);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
