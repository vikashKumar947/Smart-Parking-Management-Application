const mongoose = require("mongoose");

const waitingQueueSchema = new mongoose.Schema(
  {
    vehicleNumber: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    ownerName: {
      type: String,
      required: true,
      trim: true,
    },

    vehicleType: {
      type: String,
      required: true,
      enum: ["Car", "Bike", "Truck"],
    },

    entryTime: {
      type: Date,
      default: Date.now,
    },

    status: {
      type: String,
      enum: ["Waiting", "Allocated"],
      default: "Waiting",
    },

    queuePosition: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("WaitingQueue", waitingQueueSchema);