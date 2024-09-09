const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name for admin"],
    trim: true,
    minlength: [2, "Name must contain atleast 2 characters"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email address"],
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: [8, "Password must contain atleast 8 characters"],
    maxlength: [14, "Password should not contain more than 14 characters"],
    trim: true,
    select: false,
  },
  image: String,
  is_logged_in: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: {
      values: ["shop_admin", "super_admin"],
      message: "Choose a role between shop_admin or super_admin",
    },
    required: [true, "Please choose a role"],
  },
  created_at: { type: Date, default: Date.now },
});

adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();

  this.password = await bcrypt.hash(this.password, 12);

  next();
});

adminSchema.methods.comparePasswords = async (
  requestedPassword,
  existedPassword
) => await bcrypt.compare(requestedPassword, existedPassword);

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
