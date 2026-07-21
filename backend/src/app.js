const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const parkingRoutes = require("./routes/parkingRoutes");
const vehicleRoutes = require("./routes/vehicleRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");





const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/slots", parkingRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "Smart Parking API Running"
    });
});

module.exports = app;