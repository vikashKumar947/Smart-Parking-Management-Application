const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema(
  {
    slotNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    isOccupied: {
      type: Boolean,
      default: false,
    },
    vehicleNumber: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Slot", slotSchema);