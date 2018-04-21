const userHelper = require("../helpers/user_helper");
const passport = require("passport");

exports.register = async (req, res) => {
  try {
    const { email, full_name, password, nickname } = req.body;
    const newUser = await userHelper.registerUser({
      authType: "email",
      password,
      email,
      fullName: full_name,
      nickName: nickname
    });

    return res.send(newUser);
  } catch (e) {
    return res.status(400).send({ message: e.message });
  }
};

exports.login = async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user)
      return res.status(401).send({ message: "Wrong username or password" });
    req.logIn(user, err => {
      if (err) return next(err);
      // Remove password before sending
      user.password = undefined;
      res.send(user);
    });
  })(req, res, next);
};

exports.getCurrentUser = async (req, res) => {
  if (req.user) {
    res.send(req.user);
  } else {
    res.status(403).send({ message: "Not logged in" });
  }
};

exports.logout = (req, res) => {
  req.logout();
  res.send({ message: "Logged out" });
};
