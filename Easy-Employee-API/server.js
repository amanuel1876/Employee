require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dbConnection = require("./configs/db-config");
const authRoute = require("./routes/auth-route");
const adminRoute = require("./routes/admin-route");
const employeeRoute = require("./routes/employee-route");
const leaderRoute = require("./routes/leader-route");
const errorMiddleware = require("./middlewares/error-middleware");
const ErrorHandler = require("./utils/error-handler");
const { auth, authRole } = require("./middlewares/auth-middleware");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;

// Set strictQuery option to avoid deprecation warnings
mongoose.set("strictQuery", false);

// Database Connection
dbConnection();

const { CLIENT_URL } = process.env;
console.log("Client URL:", CLIENT_URL);

// CORS Options
const corsOptions = {
  credentials: true,
  origin: ["http://localhost:3000", "http://127.0.0.1:3000", CLIENT_URL],
};

// Middleware Configuration
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoute);
app.use("/api/admin", auth, authRole(["admin"]), adminRoute);
app.use("/api/employee", auth, authRole(["employee", "leader"]), employeeRoute);
app.use("/api/leader", auth, authRole(["leader"]), leaderRoute);

// Serve Static Files
app.use("/storage", express.static("storage"));

// Middleware for 404 Not Found
app.use((req, res, next) => {
  return next(ErrorHandler.notFound("The Requested Resources Not Found"));
});

// Error Middleware
app.use(errorMiddleware);

// Start Server
app.listen(PORT, () => console.log(`Listening on Port: ${PORT}`));
