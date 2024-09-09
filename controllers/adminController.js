const Admin = require("../models/adminModel");
const handlerFactory = require("./handlerFactory");

exports.logOut = handlerFactory.logOut(Admin);
exports.signUp = handlerFactory.signUp(Admin);
exports.logIn = handlerFactory.logIn(Admin);
exports.getAllAdmin = handlerFactory.getAll(Admin);
exports.getOneAdmin = handlerFactory.getOne(Admin);
exports.createAdmin = handlerFactory.createOne(Admin);
exports.deleteAdmin = handlerFactory.deleteOne(Admin);
exports.updateAdmin = handlerFactory.updateOne(Admin);
