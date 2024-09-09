const express = require("express");
const {
  getAllAdmin,
  getOneAdmin,
  createAdmin,
  deleteAdmin,
  signUp,
  logOut,
  logIn,
  updateAdmin,
} = require("../controllers/adminController");

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", logIn);
router.get("/logout", logOut);

router.route("/").get(getAllAdmin).post(createAdmin);
router.route("/:id").get(getOneAdmin).patch(updateAdmin).delete(deleteAdmin);

module.exports = router;
