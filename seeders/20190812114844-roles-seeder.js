"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Roles",
      [
        {
          id: 0,
          name: "Administrator",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 1,
          name: "User",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Roles", null, {});
  }
};
