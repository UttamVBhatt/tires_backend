const Notification = require("../models/notificationModel");
const handlerFactory = require("./handlerFactory");

exports.deleteNotification = handlerFactory.deleteOne(Notification);
