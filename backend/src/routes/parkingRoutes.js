const express = require("express");
const router = express.Router();

const {
  initializeSlots,
  getAllSlots,
  getAvailableSlots,
  getSlotByNumber,
} = require("../controllers/parkingController");

router.post("/init", initializeSlots);

router.get("/", getAllSlots);

router.get("/available", getAvailableSlots);

router.get("/number/:slotNumber", getSlotByNumber);


module.exports = router;