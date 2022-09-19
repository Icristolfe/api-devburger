"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("categories", "path", {
      type: Sequelize.STRING
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn("categories", "path");
  },
};
