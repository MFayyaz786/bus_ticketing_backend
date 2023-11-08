require("dotenv").config({ path: ".env" });
const colors = require("colors");
const express = require("express");
const DBConnect = require("./src/config/dbConnect");
const app=require("./app")
// Database connection
DBConnect();

if (process.env.NODE_ENV === "production") {
  // Configure logging for production
  const winston = require("winston"); // Replace with your logging library
  // Configure Winston to log to files or other destinations
  // You can also set log levels based on the environment
  winston.log("info", "App is running in production");
} else {
  // For development and other environments, configure logging differently
  console.log(colors.yellow.bold("App is running in development"));
}

// Start the server
const port = process.env.PORT || 7000;
const server = app.listen(port, () => {
  console.log(colors.yellow.bold(`App is running on port ${port}`));
});

// Handle unhandled rejections
process.on("unhandledRejection", (error) => {
  console.log("Unhandled Rejection:", error.message);
  server.close(() => {
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err.message);
  console.error(err.stack);
  server.close(() => {
    process.exit(1);
  });
});

// Add your routes and application logic here

// Use the centralized error handler
//app.use(handleErrors);
