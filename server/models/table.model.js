const mongoose = require("mongoose");

const TableSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    noOfSeats: {
      type: Number,
      default: Math.floor(Math.random() * 6) + 2,
    },
    isOccupied: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Table = mongoose.model("Table", TableSchema);

module.exports = Table;
