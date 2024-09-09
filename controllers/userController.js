const User = require("../models/userModel");
const handlerFactory = require("./handlerFactory");

exports.signUp = handlerFactory.signUp(User);
exports.logIn = handlerFactory.logIn(User);
exports.logOut = handlerFactory.logOut(User);
exports.getAllUsers = handlerFactory.getAll(User);
exports.getOneUser = handlerFactory.getOne(User);
exports.updateUser = handlerFactory.updateOne(User);
exports.deleteUser = handlerFactory.deleteOne(User);
exports.addToCart = handlerFactory.addToCart(User);
