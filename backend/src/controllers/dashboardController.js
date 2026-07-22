const Slot = require("../models/Slot");
const ParkingRecord = require("../models/ParkingRecord");
const WaitingVehicle = require("../models/WaitingVehicle");

const getDashboardData = async (req, res) => {
  try {
    const totalSlots = await Slot.countDocuments();

    const availableSlots = await Slot.countDocuments({
      isOccupied: false,
    });

    const occupiedSlots = await Slot.countDocuments({
      isOccupied: true,
    });

    const activeVehicles = await ParkingRecord.countDocuments({
      exitTime: null,
    });
    const waitingVehicles = await WaitingVehicle.countDocuments({
      status: "Waiting",
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayEntries = await ParkingRecord.countDocuments({
      entryTime: {
        $gte: today,
      },
    });

    const todayRecords = await ParkingRecord.find({
      exitTime: {
        $gte: today,
      },
    });

    const todayRevenue = todayRecords.reduce(
      (sum, record) => sum + record.parkingFee,
      0,
    );

    res.json({
      totalSlots,
      availableSlots,
      occupiedSlots,
      activeVehicles,
      waitingVehicles,
      todayEntries,
      todayRevenue,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardData,
};
