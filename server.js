const app = require("./app");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

process.on("uncaughtException", (err, res) => {
  console.log(err.message, err.stack);
  console.log("Uncaught Exception, Shutting Down...");
  process.exit(1);
});

dotenv.config({ path: "./config.env" });

const port = process.env.PORT;
const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    dbName: "TiresHub",
  })
  .then(() => console.log("Database connected Successfully"))
  .catch((err) => console.log(err));

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

process.on("unhandledRejection", (err, res) => {
  console.log(err.message, err.stack);
  console.log("Unhandled Rejection, Shutting Down...");
  server.close(() => {
    process.exit(1);
  });
});
