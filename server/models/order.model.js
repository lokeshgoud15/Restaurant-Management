const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    customerDetails: {
      name: { type: String, required: true },
      phone: {
        type: String,
        required: function () {
          return !this.customerDetails.email;
        },
      },
      email: {
        type: String,
        required: function () {
          return !this.customerDetails.phone;
        },
      },
    },
    tableDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Table",
    },
    orderItems: {
      type: Array,
      required: true,
      default: [],
    },
    address: {
      type: String,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    orderType: {
      type: String,
      enum: ["dine in", "take away"],
      required: true,
    },

    status: {
      type: String,
      enum: ["processing", "served", "done", "not picked up"],
      default: "processing",
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chef",
    },
    expectedCompletion: {
      type: String,
      required: true,
    },
    occupants: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
