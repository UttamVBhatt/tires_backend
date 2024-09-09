const express = require("express");
const {
  getAllProducts,
  getOneProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const router = express.Router();

router.route("/").get(getAllProducts).post(createProduct);

router
  .route("/:id")
  .get(getOneProduct)
  .patch(updateProduct)
  .delete(deleteProduct);

module.exports = router;
