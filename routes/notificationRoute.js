const express = require("express");
const { deleteNotification } = require("../controllers/notificationController");

const router = express.Router();

router.delete("/", deleteNotification);

module.exports = router;
