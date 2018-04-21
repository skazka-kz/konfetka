// Global state store
import { store } from "react-easy-state";
import authHelper from "../helpers/authHelper";

const authStore = store({
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
        authStore.authenticated = true;
        authStore.user = result;
      }
    } catch (e) {
      if (e.response.status === 401) {
        authStore.loginError = "Wrong username or password";
      } else {
        authStore.loginError = "Error when logging in";
      }
    }
  },
  async logout() {
    try {
      const result = await authHelper.logout();
      if (result === true) {
        authStore.authenticated = false;
        authStore.user = null;
      }
    } catch (e) {
      authStore.logoutError = true;
    }
  },
  async getCurrentUser() {
    try {
      const result = await authHelper.getCurrentUser();
      if (result) {
        authStore.authenticated = true;
        authStore.user = result;
      } else {
        authStore.authenticated = false;
        authStore.user = null;
      }
    } catch (e) {}
  },
  async registerNewUser(userData) {
    try {
      const result = await authHelper.registerNewUser(userData);
      if (result) {
        // Also login using the API to to set the token
        await authStore.authenticate(userData.email, userData.password);
      }
    } catch (e) {
      authStore.registrationError = e;
    }
  },
  async handleLogin(e) {
    e.preventDefault();
    const email = e.target.elements.login_email.value;
    const pass = e.target.elements.login_password.value;

    await authStore.authenticate(email, pass);
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
      authStore.registrationError = "Passwords have to match";
      return null;
    }
    await authStore.registerNewUser({
      email,
      fullName,
      password: pass1,
      nickName
    });
  }
});

export default authStore;