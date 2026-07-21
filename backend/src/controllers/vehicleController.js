const Vehicle = require("../models/Vehicle");
const Slot = require("../models/Slot");
const ParkingRecord = require("../models/ParkingRecord");

const vehicleEntry = async (req, res) => {
  try {
    const { vehicleNumber, ownerName, vehicleType } = req.body;

    // ===============================
    // Validation
    // ===============================
    if (!vehicleNumber || !ownerName || !vehicleType) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // ===============================
    // Check if vehicle is already parked
    // ===============================
    const parkedVehicle = await Slot.findOne({
      vehicleNumber,
      isOccupied: true,
    });

    if (parkedVehicle) {
      return res.status(400).json({
        success: false,
        message: "Vehicle is already parked",
      });
    }

    // ===============================
    // Find first available slot
    // ===============================
    const availableSlot = await Slot.findOne({
      isOccupied: false,
    }).sort({ slotNumber: 1 });

    if (!availableSlot) {
      return res.status(404).json({
        success: false,
        message: "Parking is full",
      });
    }

    // ===============================
    // Save vehicle if new
    // ===============================
    let vehicle = await Vehicle.findOne({ vehicleNumber });

    if (!vehicle) {
      vehicle = await Vehicle.create({
        vehicleNumber,
        ownerName,
        vehicleType,
      });
    }

    // ===============================
    // Occupy slot
    // ===============================
    availableSlot.isOccupied = true;
    availableSlot.vehicleNumber = vehicleNumber;
    console.log("Available Slot:", availableSlot);
    await availableSlot.save();

    // ===============================
    // Create parking record
    // ===============================
    const parkingRecord = await ParkingRecord.create({
      vehicle: vehicle._id,
      slot: availableSlot._id,
      entryTime: new Date(),
    });

    // ===============================
    // Response
    // ===============================
    return res.status(201).json({
      success: true,
      message: "Vehicle parked successfully",
      data: {
        slotNumber: availableSlot.slotNumber,
        vehicleNumber,
        ownerName,
        vehicleType,
        entryTime: parkingRecord.entryTime,
      },
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const vehicleExit = async (req, res) => {
  try {
    const { vehicleNumber } = req.body;

    // Validate input
    if (!vehicleNumber) {
      return res.status(400).json({
        success: false,
        message: "Vehicle number is required",
      });
    }

    // Find vehicle
    const vehicle = await Vehicle.findOne({ vehicleNumber });

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }

    // Find active parking record
    const parkingRecord = await ParkingRecord.findOne({
      vehicle: vehicle._id,
      exitTime: null,
    });

    if (!parkingRecord) {
      return res.status(404).json({
        success: false,
        message: "Vehicle is not currently parked",
      });
    }

    // Find occupied slot
    const slot = await Slot.findById(parkingRecord.slot);

    if (!slot) {
      return res.status(404).json({
        success: false,
        message: "Parking slot not found",
      });
    }

    // Exit time
    const exitTime = new Date();

    // Calculate duration in hours
    const durationInMs = exitTime - parkingRecord.entryTime;

    const durationInHours = Math.ceil(
      durationInMs / (1000 * 60 * 60)
    );

    // Fee calculation
    let hourlyRate = 20;

    if (vehicle.vehicleType.toLowerCase() === "bike") {
      hourlyRate = 10;
    }

    const parkingFee = durationInHours * hourlyRate;

    // Update parking record
    parkingRecord.exitTime = exitTime;
    parkingRecord.parkingFee = parkingFee;

    await parkingRecord.save();

    // Free parking slot
    slot.isOccupied = false;
    slot.vehicleNumber = null;

    await slot.save();

    return res.status(200).json({
      success: true,
      message: "Vehicle exited successfully",
      data: {
        vehicleNumber,
        slotNumber: slot.slotNumber,
        entryTime: parkingRecord.entryTime,
        exitTime,
        parkingDuration: `${durationInHours} hour(s)`,
        parkingFee,
      },
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getParkingHistory = async (req, res) => {
  try {
    const history = await ParkingRecord.find()
      .populate("vehicle")
      .populate("slot")
      .sort({ createdAt: -1 });

    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  vehicleEntry,
  vehicleExit,
  getParkingHistory,
};