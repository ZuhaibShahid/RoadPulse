'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Country extends Model {
    static associate(models) {
      Country.hasMany(models.Vehicle, { foreignKey: 'country_id', as: 'vehicles' });
    }
  }
  Country.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      iso_code: {
        type: DataTypes.STRING(3),
        allowNull: false,
        unique: true,
      },
      phone_code: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      currency: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      continent: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      latitude: {
        type: DataTypes.DECIMAL(10, 8),
        allowNull: true,
      },
      longitude: {
        type: DataTypes.DECIMAL(11, 8),
        allowNull: true,
      },
      gdp: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      population: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      road_length_km: {
        type: DataTypes.BIGINT,
        allowNull: true,
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
      modelName: 'Country',
      tableName: 'countries',
      timestamps: true,
    }
  );

  return Country;
};
