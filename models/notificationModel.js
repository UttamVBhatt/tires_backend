const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: "User" },
  message: String,
  created_at: { type: Date, default: Date.now },
});

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
