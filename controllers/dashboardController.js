
const sequelize = require("../config/database");


exports.getVehiclesByCountries = async (req, res) => {
  try {
     const [vehiclebycountries] = await sequelize.query(`
      SELECT
        c.id AS country_id,
        c.name AS country_name,
        COUNT(v.id) AS vehicle_count
    FROM 
        countries c
    LEFT JOIN 
        vehicles v 
    ON 
        v.country_id = c.id
    GROUP BY 
        c.id, c.name
    `);
    res.json(vehiclebycountries);
  } catch (error) {
    res.status(500).json({ message: "Error fetching countries", error });
  }
};

exports.getVehiclesByFuelType = async (req, res) => {
    try {
      const [vehiclesByFuel] = await sequelize.query(`
        SELECT 
            v.registration_year,
            v.fuel_type,
            SUM(v.total_count) AS total_vehicles
        FROM vehicles v
        GROUP BY v.registration_year, v.fuel_type
        ORDER BY v.registration_year DESC, v.fuel_type;
      `);
      res.json(vehiclesByFuel);
    } catch (error) {
      res.status(500).json({ message: "Error fetching vehicles by fuel type", error });
    }
  };

  
  exports.getVehiclesByType = async (req, res) => {
    try {
      const [vehiclesByType] = await sequelize.query(`
        SELECT 
          v.vehicle_type AS vehicle_type,
          COUNT(v.id) AS vehicle_count
        FROM vehicles v
        GROUP BY v.vehicle_type
      `);
      res.json(vehiclesByType);
    } catch (error) {
      res.status(500).json({ message: "Error fetching vehicles by vehicle type", error });
    }
  };
  
  exports.getTopTiles = async (req, res) => {
    try {
      const [topTiles] = await sequelize.query(`
        SELECT 
            vehicle_type,
            SUM(total_count) AS total_vehicles
        FROM vehicles
        where vehicle_type in ('Sedan', 'Bus', 'Motorcycle', 'Truck')
        GROUP BY vehicle_type
        ORDER BY total_vehicles DESC;
      `);
      res.json(topTiles);
    } catch (error) {
      res.status(500).json({ message: "Error fetching top tiles", error });
    }
  };

  exports.getTopFourCountriesByCount = async (req, res) => {
    try {
      const [topfourcountries] = await sequelize.query(`
        SELECT
        c.id AS country_id,
        c.name AS country_name,
        COUNT(v.id) AS vehicle_count
    FROM 
        countries c
    LEFT JOIN 
        vehicles v 
    ON 
        v.country_id = c.id
    GROUP BY 
        c.id, c.name
    Order by vehicle_count Desc
    Limit 4
      `);
      res.json(topfourcountries);
    } catch (error) {
      res.status(500).json({ message: "Error fetching Top Four Countries Count", error });
    }
  };
  
  exports.getStatistics = async (req, res) => {
    try {
        const [[statistics]] = await sequelize.query(`
            SELECT
                COUNT(c.id) AS country_count,
                COUNT(v.id) AS vehicle_count
            FROM 
                countries c
            LEFT JOIN 
                vehicles v 
            ON 
                v.country_id = c.id
        `);
        
        res.json(statistics);
    } catch (error) {
        res.status(500).json({ message: "Error fetching Statistics Count", error });
    }
};