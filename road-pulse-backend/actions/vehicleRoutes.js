const express = require("express");
const { getVehicles, updateVehicle, deleteVehicle  } = require("../controllers/vehiclesController");

const router = express.Router();

router.get("/", getVehicles);
router.put("/edit/:id", updateVehicle);
router.delete("/delete/:id", deleteVehicle);

module.exports = router;
