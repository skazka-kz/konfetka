// Passport auth logic, serialize/deserialize users etc
const passport = require("passport");
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  return done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (e) {
    done(e);
  }
});

passport.use(
  new LocalStrategy(async (email, password, done) => {
    try {
      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        return done(null, false);
      }
      const passIsCorrect = await verifyPassword(password, user);
      if (!passIsCorrect) {
        return done(null, false);
      }
      return done(null, user);
    } catch (e) {
      done(e);
    }
  })
);

const verifyPassword = async (password, user) => {
  return await bcrypt.compare(password, user.password);
};

module.exports = passport;
