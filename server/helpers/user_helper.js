const User = require("../models/User");

module.exports = {
  validateEmail(email) {
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regEx.test(String(email).toLowerCase());
  },
  registerUser(userData) {
    // User data should have email, password, full name, nick name, isAdmin and isEditor as well as type of auth used
    // First validate all the fields
    return new Promise(async (resolve, reject) => {
      try {
        if (!userData.email) {
          reject(new Error("Email is required"));
        }
        if (!userData.fullName) {
          reject(new Error("Full name is required"));
        }
        if (!userData.password) {
          reject(new Error("Password is required"));
        }
        // validate email
        if (!this.validateEmail(userData.email)) {
          reject(new Error("Invalid email"));
        }
        // make sure no user with such email exists
        const users = await User.find({ email: userData.email });
        if (users.length > 0) {
          reject(new Error("User with this email already exists"));
        }

        // All seems good, proceed to save the user
        const newUser = await new User({
          authType: userData.authType,
          password: userData.password,
          email: userData.email,
          fullName: userData.fullName,
          nickName: userData.nickName,
          isAdmin: userData.isAdmin,
          isEditor: userData.isEditor
        }).save();
        // Remove password from the response
        newUser.password = undefined;

        resolve(newUser);
      } catch (e) {
        reject(e);
      }
    });
  }
};
