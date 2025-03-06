const express = require("express");
const { 
    getVehiclesByCountries,
    getVehiclesByFuelType,
    getVehiclesByType,
    getTopTiles,
    getTopFourCountriesByCount,
    getStatistics} = require("../controllers/dashboardController");

const router = express.Router();
router.get("/getVehiclesByCountries", getVehiclesByCountries);
router.get("/getVehiclesByFuelType", getVehiclesByFuelType);
router.get("/getVehiclesByType", getVehiclesByType);
router.get("/getTopTiles", getTopTiles);
router.get("/getTopFourCountriesByCount", getTopFourCountriesByCount);
router.get("/getStatistics", getStatistics);


module.exports = router;
