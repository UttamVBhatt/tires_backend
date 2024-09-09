const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  company_name: {
    type: String,
    required: [true, "Please provide your company name"],
    minlength: [2, "Company's name must contain atleast 2 characters"],
    maxlength: [20, "Compnay's name should not contain more than 20 letters"],
    trim: true,
  },
  registration_number: {
    type: String,
    required: [true, "Please provide your compnay registration number"],
    trim: true,
    minlength: [
      2,
      "Compnay's registration number must contain atleast 2 characters",
    ],
    maxlength: [
      20,
      "Compnay's registration number should not contain more than 20 letters",
    ],
  },
  manager_name: {
    type: String,
    required: [true, "Please provide your manager's name"],
    minlength: [2, "Manager's name must contain atleast 2 characters"],
    maxlength: [20, "Manager's name should not contain more than 20 letters"],
    trim: true,
  },
  company_address: {
    type: String,
    required: [true, "Please provide your compnay's address"],
    minlength: [5, "Manager's name must contain atleast 2 characters"],
    maxlength: [30, "Manager's name should not contain more than 20 letters"],
    trim: true,
  },
  business_url: {
    type: String,
    required: [true, "Please provide your business url"],
    minlength: [10, "Business url must contain atleast 10 characters"],
    trim: true,
  },
  phone_number: {
    type: Number,
    required: [true, "Please provide your company's phone number"],
    minlength: [
      10,
      "Company's phone number must contain atleast 10 characters",
    ],
    maxlength: [
      14,
      "Company's phone number should not contain more than 14 characters",
    ],
  },
  company_email: {
    type: String,
    required: [true, "Please provide your company's email"],
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: [8, "Password must contain atleast 8 characters"],
    maxlength: [14, "Password should not contain more than 14 characters"],
    trim: true,
    select: false,
  },
  password_confirm: {
    type: String,
    required: [true, "Please confirm your password"],
    minlength: [8, "Password must contain atleast 8 characters"],
    maxlength: [14, "Password should not contain more than 14 characters"],
    trim: true,
    validate: {
      validator: function (val) {
        return this.password === val;
      },
      message: "Both passwords are not same, please check your both passwords",
    },
  },
  orders: [{ images: Array, price: String, profile: String, name: String }],
  cart: [{ type: mongoose.Schema.ObjectId, ref: "Orders" }],
  activities: [{ type: mongoose.Schema.ObjectId, ref: "Activities" }],
  transactions: [{ type: mongoose.Schema.ObjectId, ref: "Transactions" }],
  is_logged_in: { type: Boolean, default: false },
  last_login: { type: Date },
  login_duration: { type: String },
  image: String,
  messages: [{ type: mongoose.Schema.ObjectId, ref: "Messages" }],
  notifications: [{ type: mongoose.Schema.ObjectId, ref: "Notifications" }],
  created_at: { type: Date, default: Date.now },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();

  this.password = await bcrypt.hash(this.password, 12);

  this.password_confirm = undefined;

  next();
});

userSchema.methods.comparePasswords = async (
  requestedPassword,
  existedPassword
) => await bcrypt.compare(requestedPassword, existedPassword);

const User = mongoose.model("User", userSchema);

module.exports = User;
