const Users = require("../models/userModel");
const Transactions = require("../models/transactionModel");
const Orders = require("../models/orderModel");
const Products = require("../models/productModel");
const catchAsync = require("../utils/catchAsync");
const APIFeatures = require("../utils/APIFeatures");

exports.dashboard = catchAsync(async (req, res) => {
  const Models = [Users, Transactions, Orders, Products];
  const stringModels = ["Users", "Transactions", "Orders", "Products"];

  const Dashboard = Models.map(async (Model, i) => {
    const filteredDocs = new APIFeatures(Model.find(), req.query)
      .filter()
      .sort()
      .page()
      .limitingFields();

    const docs = await filteredDocs.query;

    const totalIndicator = `Total${stringModels[i]}`;

    return { [totalIndicator]: docs };
  });

  const finalValues = await Promise.all(Dashboard);

  const bestSellingProducts = await Orders.aggregate([
    {
      $group: {
        _id: "$product",
      },
    },
    {
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "_id",
        as: "productDetails",
      },
    },
  ]);

  res.status(200).json({
    status: "success",
    data: {
      finalValues,
      bestSellingProducts,
    },
  });
});
