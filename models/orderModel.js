const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customer_name: {
    type: String,
    required: [true, "Please provide customer's name"],
  },
  users: { type: mongoose.Schema.ObjectId, ref: "User" },
  product: { type: mongoose.Schema.ObjectId, ref: "Products" },
  total_price: Number,
  status: {
    type: String,
    enum: {
      values: [
        "pending",
        "confirmed",
        "shipped",
        "delivered",
        "cancelled",
        "done",
      ],
      message:
        "Order's status must be either pending, confirmed, shipped, delivered or cancelled",
    },
    default: "pending",
  },
  created_at: { type: Date, default: Date.now },
});

const Orders = mongoose.model("Orders", orderSchema);

module.exports = Orders;
