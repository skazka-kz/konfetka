const express = require("express");
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