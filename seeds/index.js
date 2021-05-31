const seedUsers = require("./userSeeds");
const seedPosts = require("./postSeeds");
const sequelize = require("../config/connection");
const seedComment = require("./commentSeeds");

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUsers();
  await seedPosts();
  await seedComment();

  process.exit(0);
};

seedAll();
