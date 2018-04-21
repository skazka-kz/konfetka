const express = require("express");
const helmet = require("helmet");
const path = require("path");
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const app = express();

// Secret keys for mongo, redis and cookie session encryption
const keys = require("../config/keys");

// Setting up Mongo and Mongoose
mongoose.Promise = Promise;


// Connect to MongoDB with a small async iife
(async () => {
  try {
      await mongoose.connect(keys.mongoUri);
  } catch (e) {
      console.error(`Error connecting to MongoDB: ${e.code}, ${e.message}`);
  }
})();

// Mongoose models
require("./models/ProductCategory");
require("./models/Product");
require("./models/ProductImage");
require("./models/Shop");
require("./models/User");

require("./services/passport");

// Using Helmet to setup the security for the Express server
app.use(helmet());

// Body parser to access get and post variables
app.use(bodyParser.json());
// Setting a limit of 10mb per single request
app.use(bodyParser.urlencoded({ extended: false, limit: "10mb" }));

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
