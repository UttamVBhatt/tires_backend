const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: "User" },
  message: String,
  created_at: { type: Date, default: Date.now },
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
