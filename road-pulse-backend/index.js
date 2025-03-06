const express = require("express");
const cors = require("cors");
require("dotenv").config();
const sequelize = require("./config/database");
const countriesRoutes = require("./actions/countriesRoutes");
const vehicleRoutes = require("./actions/vehicleRoutes");
const dashboardRoutes = require("./actions/dashboardRoutes");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/countries", countriesRoutes);
app.use("/vehicles", vehicleRoutes); 
app.use("/dashboard", dashboardRoutes);

sequelize
  .authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log("Error: " + err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
