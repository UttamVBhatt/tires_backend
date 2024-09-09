const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.ObjectId, ref: "User" },
  total_price: Number,
  product: { type: mongoose.Schema.ObjectId, ref: "Products" },
  created_at: { type: Date, default: Date.now },
});

const Transactions = mongoose.model("Transactions", transactionSchema);

module.exports = Transactions;
