const { User } = require("../models");

const userData = [
  {
    username: "TJ",
    email: "TJ@gmail.com",
    password: "password1234",
  },
  {
    username: "Josh",
    email: "josh@gmail.com",
    password: "password1234",
  },
  {
    username: "Jon",
    email: "Jon@gmail.com",
    password: "password1234",
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
