const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const { createSendToken, logOut } = require("./authController");
const jwt = require("jsonwebtoken");
const Notification = require("../models/notificationModel");
const User = require("../models/userModel");
const Transactions = require("../models/transactionModel");
const Products = require("../models/productModel");
const APIFeatures = require("../utils/APIFeatures");

exports.signUp = (Model) =>
  catchAsync(async (req, res) => {
    const user = await Model.create(req.body);

    createSendToken(user, res, 201);
  });

exports.logIn = (Model) =>
  catchAsync(async (req, res, next) => {
    if (req.body.email) {
      const { email, password } = req.body;

      if (!email || !password)
        next(new AppError("Please provide email and password", 403));

      const user = await Model.findOne({ email }).select("+password");

      if (!user || !(await user.comparePasswords(password, user.password)))
        next(new AppError("Please provide valid email and password", 400));

      return createSendToken(user, res, 201);
    } else {
      const { company_email, password } = req.body;

      if (!company_email || !password)
        next(new AppError("Please provide email and password", 403));

      const user = await Model.findOne({ company_email }).select("+password");

      if (!user || !(await user.comparePasswords(password, user.password)))
        next(new AppError("Please provide valid email and password", 400));

      return createSendToken(user, res, 201);
    }
  });

exports.logOut = (Model) =>
  catchAsync(async (req, res) => {
    const loggedInToken = req.cookies.jwt;

    const decoded = await jwt.verify(
      loggedInToken,
      process.env.JWT_SECRET_STRING
    );

    const user = await Model.findByIdAndUpdate(decoded.id, {
      is_logged_in: false,
    });

    if (!user.role) {
      const logoutTime = Date.now(); // Current time in milliseconds
      const loginTime = user.last_login; // The time user logged in

      const durationMs = logoutTime - loginTime; // Difference in milliseconds
      const durationSeconds = Math.floor(durationMs / 1000); // Convert to seconds

      // Convert seconds into hours, minutes, and seconds
      const hours = Math.floor(durationSeconds / 3600);
      const minutes = Math.floor((durationSeconds % 3600) / 60);
      const seconds = durationSeconds % 60;

      const durationFormatted = `${hours}h ${minutes}m ${seconds}s`;

      user.login_duration = durationFormatted;
      await user.save({ validateBeforeSave: false });
    }

    logOut(res);
  });

exports.getAll = (Model, popOptions) =>
  catchAsync(async (req, res) => {
    let docs;

    if (req.params.userId) {
      docs = await Model.find({ customer: req.params.userId });
      if (popOptions) {
        docs = await Model.find({ customer: req.params.userId }).populate(
          popOptions
        );
      }
    } else {
      docs = await Model.find();
      if (popOptions) {
        docs = await Model.find().populate(popOptions);
      }
    }

    res.status(200).json({
      status: "success",
      total_docs: docs.length,
      docs,
    });
  });

exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let doc;

    popOptions
      ? (doc = await Model.findById(req.params.id).populate(popOptions))
      : (doc = await Model.findById(req.params.id));

    if (!doc) next(new AppError("No such document found with that ID", 404));

    res.status(200).json({
      status: "success",
      doc,
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res) => {
    if (req.params.productId) {
      const user = await User.findById(req.params.userId);
      req.body = {
        ...req.body,
        product: req.params.productId,
        customer_name: user.manager_name,
        users: req.params.userId,
      };
      await Notification.create({
        user: req.params.userId,
        message: `${user.manager_name} has created a new order`,
      });
    }

    const doc = await Model.create(req.body);

    res.status(201).json({
      status: "success",
      message: "Created Successfully",
      doc,
    });
  });

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    // if (!req.params.id) next(new AppError("Please provide an ID", 403));

    if (req.params.id) {
      await Model.findByIdAndDelete(req.params.id);

      return res.status(204).json({
        status: "success",
        message: "Deleted Successfully",
      });
    } else if (req.query.delete) {
      await Notification.deleteMany();

      return res.status(204).json({
        status: "success",
        message: "Deleted Successfully",
      });
    } else {
      return next(new AppError("Please provide an ID", 403));
    }
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    // If order's status === "delivered", than we'll create a transaction with the given information
    if (doc.status === "delivered") {
      const user = await User.findById(doc.users);

      await Transactions.create({
        customer: doc.users,
        product: doc.product,
        total_price: doc.total_price,
      });

      await Notification.create({
        user: doc.customer,
        message: `${user?.manager_name} has completed an order see the transactions`,
      });
    }

    if (!doc) next(new AppError("No such doucment found with that ID", 404));

    res.status(200).json({
      status: "success",
      message: "Updated Successfully",
      doc,
    });
  });

exports.addToCart = (User) =>
  catchAsync(async (req, res, next) => {
    const user = await User.findById(req.params.userId);
    const product = await Products.findById(req.params.productId);

    if (!user) next(new AppError("No such user found with that ID", 404));
    if (!product) next(new AppError("No such product found with that ID", 404));

    user.orders.unshift({
      images: product.images || [],
      name: product.product_name || "Product Name",
      price: product.price || "Product Price",
      profile: product.profile || "Product Profiles",
    });

    await user.save({ validateBeforeSave: false });

    res.status(200).json({
      status: "success",
      message: "Added to Cart Successfully",
    });
  });

exports.dashboardFilters = (Model) =>
  catchAsync(async (req, res) => {
    const filteredDocs = new APIFeatures(Model.find(), req.query)
      .filter()
      .sort()
      .page()
      .limitingFields();

    const docs = await filteredDocs.query;

    res.status(200).json({
      status: "success",
      noOfDocs: docs.length,
      docs,
    });
  });
