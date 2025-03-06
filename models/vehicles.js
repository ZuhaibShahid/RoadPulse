'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Vehicle extends Model {
    static associate(models) {
      Vehicle.belongsTo(models.Country, { foreignKey: 'country_id', as: 'country' });
    }
  }

  Vehicle.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      country_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      brand_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      vehicle_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fuel_type: {
        type: DataTypes.ENUM('Electric', 'Fuel', 'Hybrid'),
        allowNull: false,
      },
      manufacturing_year: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      registration_year: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      registration_month: {
        type: DataTypes.TINYINT,
        allowNull: false,
      },
      total_count: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: 0,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'Vehicle',
      tableName: 'vehicles',
      timestamps: true,
    }
  );

  return Vehicle;
};