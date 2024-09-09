const express = require("express");

const app = express();

// Importing Several Middlewares
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoExpressSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");

// Importing globalErrorHandler
const globalErrorHandler = require("./controllers/errorHandler");

// Importing Routers
const userRouter = require("./routes/userRoute");
const orderRouter = require("./routes/orderRoute");
const transactionRouter = require("./routes/transactionRoute");
const activityRouter = require("./routes/activityRoute");
const productRouter = require("./routes/productRoute");
const adminRouter = require("./routes/adminRoute");
const notificationRouter = require("./routes/notificationRoute");
const messageRouter = require("./routes/messageRoute");
const dashboardRouter = require("./routes/dashboardRoute");

// Using Middlewares
app.use(express.json());
app.use(mongoExpressSanitize());
app.use(cors());
app.use(cookieParser());
app.use(helmet());

// Using Routers
app.use("/api/v1/users", userRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/transactions", transactionRouter);
app.use("/api/v1/activities", activityRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/admins", adminRouter);
app.use("/api/v1/nots", notificationRouter);
app.use("/api/v1/msgs", messageRouter);
app.use("/api/v1/stats", dashboardRouter);

// Using globalErrorHandler at the end.
app.use(globalErrorHandler);

module.exports = app;
