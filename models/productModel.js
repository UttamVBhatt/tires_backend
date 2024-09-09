const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  product_name: String,
  profile: String,
  car_brand: String,
  design_type: String,
  customs_service: Number,
  wheel_size: Number,
  load_speed_index: Number,
  price: Number,
  PR: Number,
  tt_tl: {
    type: String,
    enum: {
      values: ["tt", "tl"],
      message: "Choose either of tt or tl",
    },
  },
  width: Number,
  weight: Number,
  tyre_height: Number,
  load_per_tyre: Number,
  at_km: Number,
  EAN: {
    type: Number,
    minlength: [10, "EAN code must contain atleast 10 characters"],
  },
  brand: String,
  quantity: Number,
  total_orders: Number,
  images: [String],
  created_at: { type: Date, default: Date.now },
});

const Products = mongoose.model("Products", productSchema);

module.exports = Products;
