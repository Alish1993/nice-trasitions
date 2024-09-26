'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          name: 'ali',
          email: 'ali@1',
          password: '123',
        },
      ],
      {},
    );

    await queryInterface.bulkInsert(
      'Posts',
      [
        {
          title: 'ali',
          img: 'https://www.1zoom.ru/big2/541/255095-Sepik.jpg',
          userId: 1,
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
