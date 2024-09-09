const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  customer: String,
  IP: String,
  activity: String,
  created_at: { type: Date, default: Date.now },
});

const Activities = mongoose.model("Activities", activitySchema);

module.exports = Activities;
