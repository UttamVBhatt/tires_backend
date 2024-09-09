const Orders = require("../models/orderModel");
const handlerFactory = require("./handlerFactory");

exports.getAllOrders = handlerFactory.getAll(Orders, "users product");
exports.createOrder = handlerFactory.createOne(Orders);
exports.updateOrder = handlerFactory.updateOne(Orders);
exports.deleteOrder = handlerFactory.deleteOne(Orders);
