const queueService = require("../services/queueService");

const enqueue = async (req, res) => {
  try {
    const queue = await queueService.enqueueVehicle(req.body);

    res.status(201).json({
      success: true,
      message: "Vehicle added to waiting queue.",
      data: queue,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const dequeue = async (req, res) => {
  try {
    const vehicle = await queueService.dequeueVehicle();

    res.status(200).json({
      success: true,
      message: "Vehicle removed from waiting queue.",
      data: vehicle,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getQueue = async (req, res) => {
  try {
    const queue = await queueService.getQueue();

    res.status(200).json({
      success: true,
      count: queue.length,
      data: queue,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports = {
  enqueue,
  dequeue,
  getQueue,
};