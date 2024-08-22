'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert('Seats',[
      {
        airplaneId:1,
        row:1,
        col:'A',
        updatedAt:new Date(),
        createdAt:new Date(),
      },
      {
        airplaneId:1,
        row:1,
        col:'B',
        updatedAt:new Date(),
        createdAt:new Date(),
      }, 
      {
        airplaneId:1,
        row:1,
        col:'C',
        updatedAt:new Date(),
        createdAt:new Date(),
      }, 
      {
        airplaneId:1,
        row:1,
        col:'D',
        updatedAt:new Date(),
        createdAt:new Date(),
      }, 
      {
        airplaneId:1,
        row:1,
        col:'E',
        updatedAt:new Date(),
        createdAt:new Date(),
      },
      {
        airplaneId:1,
        row:1,
        col:'F',
        updatedAt:new Date(),
        createdAt:new Date(),
      }, 
      
      {
        airplaneId:1,
        row:2,
        col:'A',
        updatedAt:new Date(),
        createdAt:new Date(),
      },
      {
        airplaneId:1,
        row:2,
        col:'B',
        updatedAt:new Date(),
        createdAt:new Date(),
      }, 
      {
        airplaneId:1,
        row:2,
        col:'C',
        updatedAt:new Date(),
        createdAt:new Date(),
      }, 
      {
        airplaneId:1,
        row:2,
        col:'D',
        updatedAt:new Date(),
        createdAt:new Date(),
      }, 
      {
        airplaneId:1,
        row:2,
        col:'E',
        updatedAt:new Date(),
        createdAt:new Date(),
      },
      {
        airplaneId:1,
        row:2,
        col:'F',
        updatedAt:new Date(),
        createdAt:new Date(),
      }, 
      
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
