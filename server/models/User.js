// A Model to manage admin and logged in users that manage products etc
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { Schema } = mongoose;

const UserSchema = new Schema({
  googleId: String,
  authType: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    select: false
  },
  fullName: String,
  nickName: String,
  isAdmin: {
    type: Boolean,
    default: false
  },
  isEditor: {
    type: Boolean,
    default: false
  }
});

UserSchema.pre("save", async function save(next) {
  const user = this;
  if (!user.isModified('password')) { return next(); }
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  next();
});

const User = mongoose.model("users", UserSchema);

module.exports = User;
