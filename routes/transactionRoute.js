const express = require("express");
const {
  getAllTransactions,
  getOneTransaction,
  deleteTransaction,
} = require("../controllers/transactionController");
const router = express.Router();

router.get("/", getAllTransactions);
router.route("/:id").get(getOneTransaction).delete(deleteTransaction);

module.exports = router;
