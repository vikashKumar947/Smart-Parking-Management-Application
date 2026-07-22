const WaitingQueue = require("../models/WaitingVehicle");

// Add vehicle to queue
const enqueueVehicle = async (vehicleData) => {
  // Check if already waiting
  const existingVehicle = await WaitingQueue.findOne({
    vehicleNumber: vehicleData.vehicleNumber,
    status: "Waiting",
  });

  if (existingVehicle) {
    throw new Error("Vehicle is already in the waiting queue.");
  }

  // Find the last queue position
  const lastVehicle = await WaitingQueue.findOne().sort({
    queuePosition: -1,
  });

  const nextPosition = lastVehicle
    ? lastVehicle.queuePosition + 1
    : 1;

  // Create queue entry
  const newVehicle = await WaitingQueue.create({
    ...vehicleData,
    queuePosition: nextPosition,
  });

  return newVehicle;
};


// Remove first vehicle
const dequeueVehicle = async () => {
  // Find the first vehicle in the queue
  const firstVehicle = await WaitingQueue.findOne({
    status: "Waiting",
  }).sort({
    queuePosition: 1,
  });

  if (!firstVehicle) {
    throw new Error("Waiting queue is empty.");
  }

  // Remove it from the queue
  await WaitingQueue.findByIdAndDelete(firstVehicle._id);

  // Shift remaining queue positions
  await WaitingQueue.updateMany(
    {
      queuePosition: { $gt: firstVehicle.queuePosition },
    },
    {
      $inc: { queuePosition: -1 },
    }
  );

  return firstVehicle;
};

// Get complete queue
const getQueue = async () => {
  const queue = await WaitingQueue.find({
    status: "Waiting",
  }).sort({
    queuePosition: 1,
  });

  return queue;
};

module.exports = {
  enqueueVehicle,
  dequeueVehicle,
  getQueue,
};