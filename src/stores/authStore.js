// Global state store
import { store } from "react-easy-state";
import authHelper from "../helpers/authHelper";

export default store({
  authenticated: false,
  user: null,
  error: null,
  loginError: null,
  registrationError: null,
  logoutError: null,
  async authenticate(username, password) {
    try {
      const result = await authHelper.authenticate(username, password);
      if (result) {
        this.authenticated = true;
        this.user = result;
      }
    } catch (e) {
      if (e.response.status === 401) {
        this.loginError = "Wrong username or password";
      } else {
        this.loginError = "Error when logging in";
      }
    }
  },
  async logout() {
    try {
      const result = await authHelper.logout();
      if (result === true) {
        this.authenticated = false;
        this.user = null;
      }
    } catch (e) {
      this.logoutError = true;
    }
  },
  async getCurrentUser() {
    try {
      const result = await authHelper.getCurrentUser();
      if (result) {
        this.authenticated = true;
        this.user = result;
      } else {
        this.authenticated = false;
        this.user = null;
      }
    } catch (e) {}
  },
  async registerNewUser(userData) {
    try {
      const result = await authHelper.registerNewUser(userData);
      if (result) {
        // Also login using the API to to set the token
        await this.authenticate(userData.email, userData.password);
      }
    } catch (e) {
      this.registrationError = e;
    }
  },
  async handleLogin(e) {
    e.preventDefault();
    const email = e.target.elements.login_email.value;
    const pass = e.target.elements.login_password.value;

    await this.authenticate(email, pass);
  },
  async handleRegistration(e) {
    e.preventDefault();
    const targetValues = e.target.elements;
    const email = targetValues.register_email.value;
    const pass1 = targetValues.register_password_1.value;
    const pass2 = targetValues.register_password_2.value;
    const fullName = targetValues.register_full_name.value;
    const nickName = targetValues.register_nickname.value;

    if (pass1 !== pass2) {
      this.registrationError = "Passwords have to match";
      return null;
    }
    await this.registerNewUser({
      email,
      fullName,
      password: pass1,
      nickName
    });
  }
});
