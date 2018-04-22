const express = require("express");
const helmet = require("helmet");
const path = require("path");
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const app = express();
const errorHandler = require("./middlewares/errorHandler");
const winston = require("winston");

// Secret keys for mongo, redis and cookie session encryption
const keys = require("../config/keys");

// Setting up Mongo and Mongoose
mongoose.Promise = Promise;

// Connect to MongoDB with a small async iife
(async () => {
  try {
    await mongoose.connect(keys.mongoUri);
  } catch (e) {
    winston.log("error", `Error connecting to MongoDB: ${e.code}, ${e.message}`);
  }
})();

// Mongoose models
require("./models/ProductCategory");
require("./models/Product");
require("./models/ProductImage");
require("./models/Shop");
require("./models/User");

require("./services/passport");
require("./services/redisCache");

// Using Helmet to setup the security for the Express server
app.use(helmet());

// Body parser to access get and post variables
app.use(bodyParser.json());
// Setting a limit of 10mb per single request
app.use(bodyParser.urlencoded({ extended: false, limit: "10mb" }));

winston.log("info", `Cookie key is ${keys.cookieKey}`);

// Setup the cookie session with an age of 30 days
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

// Setting up authentication with Passport using a local strategy
app.use(passport.initialize());
app.use(passport.session());

// Setup routes
require("./routes/auth")(app);
require("./routes/products")(app);

// Setup static routes
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

if (["production", "ci"].includes(process.env.NODE_ENV) || process.env.CI) {
  winston.log("info", "Starting in Production mode, adding the static paths");
  app.use(express.static("build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../", "build", "index.html"));
  });
}

app.use(errorHandler);

module.exports = app;
