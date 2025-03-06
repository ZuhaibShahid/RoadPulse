const express = require("express");
const { getCountries } = require("../controllers/countriesController");

const router = express.Router();

router.get("/", getCountries);

module.exports = router;
