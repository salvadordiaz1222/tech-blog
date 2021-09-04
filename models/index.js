const User = require("./User");
const BlogPosts = require("./BlogPosts");
const Comment = require("./comment");

User.hasMany(BlogPosts, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

BlogPosts.belongsTo(User, {
  foreignKey: "user_id",
});

Comment.belongsTo(User, {
  foreignKey: "user_id",
});

BlogPosts.hasMany(Comment, {
  foreignKey: "blogPost_id",
});

module.exports = { User, BlogPosts, Comment };
