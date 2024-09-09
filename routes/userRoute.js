const express = require("express");
const {
  signUp,
  logIn,
  logOut,
  getAllUsers,
  getOneUser,
  updateUser,
  deleteUser,
  addToCart,
} = require("../controllers/userController");

const router = express.Router();
// Just a comment
router.post("/login", logIn);
router.post("/signup", signUp);
router.get("/logout", logOut);

router.route("/").get(getAllUsers);
router.route("/:id").get(getOneUser).delete(deleteUser).patch(updateUser);
router.patch("/:userId/:productId", addToCart);

module.exports = router;
