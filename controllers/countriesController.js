const { Country } = require("../models");
const sequelize = require("../config/database");


exports.getCountries = async (req, res) => {
  try {
     const [countries] = await sequelize.query(`
      SELECT c.*, COUNT(v.id) AS vehicle_count FROM countries c
      LEFT JOIN vehicles v ON v.country_id = c.id
      GROUP BY c.id;
    `);
    res.json(countries);
  } catch (error) {
    res.status(500).json({ message: "Error fetching countries", error });
  }
};

