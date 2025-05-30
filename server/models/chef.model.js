const mongoose = require("mongoose");

const chefSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  ordersAssigned: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
  ordersCompleted: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
});

const Chef = mongoose.model("Chef", chefSchema);

module.exports = Chef;

