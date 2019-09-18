'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Restaurants',
      [
        {
          name: 'Lembur Kuring',
          avatar: '',
          street: 'Medan Amplas',
          email: 'lemburkuring@gmail.com',
          password: 'admin',
          approved: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Roles', null, {});
  },
};
