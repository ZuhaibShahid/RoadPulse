const { Vehicle } = require("../models");
const sequelize = require("../config/database");


exports.getVehicles = async (req, res) => {
  try {
    const [vehicles] = await sequelize.query(`
      SELECT 
        v.*, 
        c.name AS country_name
      FROM 
        vehicles v
      JOIN 
        countries c ON v.country_id = c.id
      order by v.id asc;
    `);
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: "Error fetching vehicles", error });
  }
};

exports.updateVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const { new_brand_name, new_fuel_type } = req.body;
    console.log(req.body, "new_brand_name, new_fuel_type");

    const validFuelTypes = ["Electric", "Fuel", "Hybrid"];
    if (new_fuel_type && !validFuelTypes.includes(new_fuel_type)) {
      return res.status(400).json({ message: "Invalid fuel type" });
    }
    const [updated] = await Vehicle.update(
      { brand_name: new_brand_name, fuel_type: new_fuel_type },
      { where: { id } }
    );

    if (!updated) {
      return res.status(404).json({ message: "Vehicle not found" });
    }
    res.json({ message: "Vehicle updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating vehicle", error });
  }
};

exports.deleteVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Vehicle.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).json({ message: "Vehicle not found" });
    }
    res.json({ message: "Vehiclle deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting vehicle", error });
  }
};