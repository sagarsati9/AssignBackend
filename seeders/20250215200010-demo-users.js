module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("users", [
      {
        userName: "Alice",
        email: "alice@example.com",
        password: "hashedpassword1",
        enabled: true,
        deleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        permalink: "alice-123456",
      },
      {
        userName: "Bob",
        email: "bob@example.com",
        password: "hashedpassword2",
        enabled: true,
        deleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        permalink: "bob-123456",
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", null, {});
  },
};
