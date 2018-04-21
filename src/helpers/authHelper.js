import axios from "axios";

export default {
  authenticate: async (username, pass) => {
    const request = axios.post("/auth/email/login", {
      username: username,
      password: pass
    });

    return new Promise(async (resolve, reject) => {
      try {
        const response = await request;
        if (response.status === 200 && response.data._id) {
          resolve(response.data);
        } else {
          reject("Error while authenticating");
        }
      } catch (e) {
        reject(e);
      }
    });
  },
  logout: async () => {
    const request = axios.get("/auth/logout");
    return new Promise(async (resolve, reject) => {
      try {
        const response = await request;
        if (response.status === 200 && response.data.message === "Logged out") {
          resolve(true);
        } else {
          reject("Error while logging out");
        }
      } catch (e) {
        reject("Error when logging out");
      }
    });
  },
  getCurrentUser: async () => {
    const request = axios.get("/auth/current_user");
    return new Promise(async (resolve, reject) => {
      try {
        const response = await request;
        if (response.status === 200 && response.data._id) {
          resolve(response.data);
        }
      } catch (e) {
        if (e.response.status === 403) {
          resolve(null);
        } else {
          reject("Error while getting current user");
        }
      }
    });
  },
  registerNewUser: async newUserData => {
    const request = axios.post("/auth/email/register", {
      email: newUserData.email,
      full_name: newUserData.fullName,
      password: newUserData.password,
      nickname: newUserData.nickName
    });

    return new Promise(async (resolve, reject) => {
      try {
        const response = await request;
        if (response.status === 200 && response.data._id) {
          resolve(response.data);
        }
      } catch (e) {
        if (e.response.status === 400) {
          if (e.response.data.message) {
            reject(e.response.data.message);
          }
          reject("Error during user registration");
        }
      }
    });
  }
};
