const { getCurrentUser, login, logout, register } = require("../controllers/auth");

module.exports = app => {
  app.post("/auth/email/register", register);
  app.post("/auth/email/login", login);
  app.get("/auth/current_user", getCurrentUser);
  app.get("/auth/logout", logout);
};
