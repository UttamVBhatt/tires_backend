const Transactions = require("../models/transactionModel");
const handlerFactory = require("./handlerFactory");

exports.getAllTransactions = handlerFactory.getAll(Transactions);
exports.getOneTransaction = handlerFactory.getOne(
  Transactions,
  "customer product"
);
exports.deleteTransaction = handlerFactory.deleteOne(Transactions);
