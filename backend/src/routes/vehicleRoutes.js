const express = require("express");
const router = express.Router();

const { 
    vehicleEntry,
    vehicleExit,
    getParkingHistory
    } = require("../controllers/vehicleController");

router.post("/entry", vehicleEntry);
router.post("/exit", vehicleExit);
router.get("/history", getParkingHistory);
module.exports = router;
