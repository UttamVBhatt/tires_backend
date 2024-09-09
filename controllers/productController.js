const Products = require("../models/productModel");
const handlerFactory = require("./handlerFactory");

exports.getAllProducts = handlerFactory.getAll(Products);
exports.getOneProduct = handlerFactory.getOne(Products);
exports.createProduct = handlerFactory.createOne(Products);
exports.updateProduct = handlerFactory.updateOne(Products);
exports.deleteProduct = handlerFactory.deleteOne(Products);
