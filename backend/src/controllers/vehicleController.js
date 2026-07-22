const Vehicle = require("../models/Vehicle");
const Slot = require("../models/Slot");
const WaitingVehicle = require("../models/WaitingVehicle");
const ParkingRecord = require("../models/ParkingRecord");
const { execFile } = require("child_process");
const util = require("util");
const path = require("path");

const execFilePromise = util.promisify(execFile);

const cppPath = path.join(
  process.cwd(),
  "cpp",
  "parking",
  "parking"
);
console.log("C++ Path:", cppPath);

const vehicleEntry = async (req, res) => {
  try {
    const { vehicleNumber, ownerName, vehicleType } = req.body;

    // Validate input
    if (!vehicleNumber || !ownerName || !vehicleType) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check if vehicle is already parked
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

    // Get all available slots
    const freeSlots = await Slot.find({
      isOccupied: false,
    }).sort({ slotNumber: 1 });

    // Parking Full → Add vehicle to waiting queue
    if (freeSlots.length === 0) {
      // Check if already waiting
      const alreadyWaiting = await WaitingVehicle.findOne({
        vehicleNumber,
        status: "Waiting",
      });

      if (alreadyWaiting) {
        return res.status(400).json({
          success: false,
          message: "Vehicle is already in the waiting queue.",
        });
      }

      // Queue position
      const queueLength = await WaitingVehicle.countDocuments({
        status: "Waiting",
      });

      await WaitingVehicle.create({
        vehicleNumber,
        ownerName,
        vehicleType,
        entryTime: new Date(),
        queuePosition: queueLength + 1,
        status: "Waiting",
      });

      return res.status(200).json({
        success: true,
        message: "Parking Full. Vehicle added to waiting queue.",
        queuePosition: queueLength + 1,
      });
    }

    // Convert slot numbers into string for C++
    const slotString = freeSlots
      .map((slot) => slot.slotNumber)
      .join(" ");

    // Run C++ parking allocation
    const { stdout } = await execFilePromise(cppPath, [slotString]);

    const allocatedSlotNumber = parseInt(stdout.trim());

    // Find allocated slot
    const availableSlot = await Slot.findOne({
      slotNumber: allocatedSlotNumber,
    });

    if (!availableSlot) {
      return res.status(500).json({
        success: false,
        message: "C++ failed to allocate a valid slot.",
      });
    }

    // Find or create vehicle
    let vehicle = await Vehicle.findOne({ vehicleNumber });

    if (!vehicle) {
      vehicle = await Vehicle.create({
        vehicleNumber,
        ownerName,
        vehicleType,
      });
    }

    // Occupy slot
    availableSlot.isOccupied = true;
    availableSlot.vehicleNumber = vehicleNumber;

    await availableSlot.save();

    // Create parking history
    const parkingRecord = await ParkingRecord.create({
      vehicle: vehicle._id,
      slot: availableSlot._id,
      entryTime: new Date(),
    });

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

    // Calculate parking duration
    const durationInMs = exitTime - parkingRecord.entryTime;
    const durationInHours = Math.ceil(durationInMs / (1000 * 60 * 60));

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

    // ================================
    // FIFO Queue Logic Starts Here
    // ================================

    const waitingVehicle = await WaitingVehicle.findOne({
      status: "Waiting",
    }).sort({ queuePosition: 1 });

    if (waitingVehicle) {
      // Find or create vehicle
      let nextVehicle = await Vehicle.findOne({
        vehicleNumber: waitingVehicle.vehicleNumber,
      });

      if (!nextVehicle) {
        nextVehicle = await Vehicle.create({
          vehicleNumber: waitingVehicle.vehicleNumber,
          ownerName: waitingVehicle.ownerName,
          vehicleType: waitingVehicle.vehicleType,
        });
      }

      // Assign freed slot
      slot.isOccupied = true;
      slot.vehicleNumber = waitingVehicle.vehicleNumber;

      await slot.save();

      // Create parking record
      await ParkingRecord.create({
        vehicle: nextVehicle._id,
        slot: slot._id,
        entryTime: new Date(),
      });

      // Remove from waiting queue
      await WaitingVehicle.deleteOne({
        _id: waitingVehicle._id,
      });

      // Shift queue positions
      await WaitingVehicle.updateMany(
        {
          queuePosition: { $gt: waitingVehicle.queuePosition },
        },
        {
          $inc: { queuePosition: -1 },
        }
      );
    }

    // ================================
    // Return Exit Response
    // ================================

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
