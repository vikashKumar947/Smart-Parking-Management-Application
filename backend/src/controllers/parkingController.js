const Slot = require("../models/Slot");

// Initialize parking slots
const initializeSlots = async (req, res) => {
  try {
    // Get totalSlots from request body
    const { totalSlots } = req.body;

    // Validate input
    if (!totalSlots || totalSlots <= 0) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid number of slots",
      });
    }

    // Check if slots already exist
    const existingSlots = await Slot.countDocuments();

    if (existingSlots > 0) {
      return res.status(400).json({
        success: false,
        message: "Parking slots are already initialized",
      });
    }

    // Create an array of slots
    const slots = [];

    for (let i = 1; i <= totalSlots; i++) {
      slots.push({
        slotNumber: i,
      });
    }

    // Save all slots to MongoDB
    await Slot.insertMany(slots);

    res.status(201).json({
      success: true,
      message: `${totalSlots} slots created successfully`,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllSlots = async (req, res) => {
  try {
    const slots = await Slot.find().sort({ slotNumber: 1 });

    res.status(200).json({
      success: true,
      total: slots.length,
      data: slots,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAvailableSlots = async (req, res) => {
  try {
    const slots = await Slot.find({ isOccupied: false }).sort({
      slotNumber: 1,
    });

    res.status(200).json({
      success: true,
      availableSlots: slots.length,
      data: slots,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getSlotByNumber = async (req, res) => {
  try {
    const { slotNumber } = req.params;
    const slotNumberInt = Number(slotNumber);

    if (isNaN(slotNumber)) {
      return res.status(400).json({
        success: false,
        message: "Invalid slot number",
      });
    }

    const slot = await Slot.findOne({ slotNumber });

    if (!slot) {
      return res.status(404).json({
        success: false,
        message: "Slot not found",
      });
    }

    res.status(200).json({
      success: true,
      data: slot,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



module.exports = {
  initializeSlots,
  getAllSlots,
  getAvailableSlots,
  getSlotByNumber,
};