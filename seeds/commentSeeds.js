const { Comment } = require("../models");

const commentData = [
  {
    comment_text: "This is a comment",
    post_id: 3,
    user_id: 3,
  },
  {
    comment_text: "This another comment",
    post_id: 1,
    user_id: 2,
  },
  {
    comment_text: "last comment",
    post_id: 4,
    user_id: 1,
  },
];

const seedComment = () => Comment.bulkCreate(commentData);

module.exports = seedComment;
