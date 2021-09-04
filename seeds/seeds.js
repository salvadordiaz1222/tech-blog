const sequelize = require("../config/connection");
const { User, BlogPosts, Comment } = require("../models");

const userData = require("./userData.json");
const blogData = require("./blogPostsData.json");
const commentData = require("./commentData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  console.log("finished the user seed");

  await BlogPosts.bulkCreate(blogData);

  console.log("Finished Blog post");

  await Comment.bulkCreate(commentData);

  console.log("Finished comment");

  process.exit(0);
};

seedDatabase();
