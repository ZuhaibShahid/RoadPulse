
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('vehicles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      country_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'countries',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      brand_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      vehicle_type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      fuel_type: {
        type: Sequelize.ENUM('Electric', 'Fuel', 'Hybrid'),
        allowNull: false,
      },
      manufacturing_year: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      registration_year: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      registration_month: {
        type: Sequelize.TINYINT,
        allowNull: false,
      },
      total_count: {
        type: Sequelize.BIGINT,
        allowNull: false,
        defaultValue: 0,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('vehicles');
  },
};
