// A Model to manage admin and logged in users that manage products etc
const mongoose = require("mongoose");
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

const User = mongoose.model("users", UserSchema);

module.exports = User;
