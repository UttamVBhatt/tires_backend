const express = require("express");
const {
  getAllOrders,
  updateOrder,
  deleteOrder,
  createOrder,
} = require("../controllers/orderController");
const router = express.Router();

router.get("/", getAllOrders);
router.get("/one/:userId", getAllOrders);
router.route("/:id").patch(updateOrder).delete(deleteOrder);
router.route("/:userId/:productId").post(createOrder);

module.exports = router;
