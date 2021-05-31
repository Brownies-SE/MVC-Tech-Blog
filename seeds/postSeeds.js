const { Post } = require("../models");

const postData = [
  {
    title: "Sequelize Data Types",
    post_text: "Sequelize",
    user_id: 1,
  },
  {
    title: "Handlebars",
    post_text: "Handlebars",
    user_id: 2,
  },
  {
    title: "Sessions",
    post_text: "Sessions",
    user_id: 3,
  },
  {
    title: "Hashing",
    post_text: "Hashing",
    user_id: 3,
  },
  {
    title: "Express.js",
    post_text: "Express.js ",
    user_id: 3,
  },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
