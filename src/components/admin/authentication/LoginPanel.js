import React from "react";
import { Link } from "react-router-dom";
import { view } from "react-easy-state";
import authState from "../../../stores/authStore";

const LoginPanel = () => (
  <form onSubmit={authState.handleLogin}>
    <h4>Login using email and password</h4>

    {authState.error ? <p className="red">{authState.error}</p> : ""}

    <label>
      <input
        type="email"
        name="login_email"
        placeholder="Email"
        defaultValue="slava@bez.com"
      />
    </label>
    <label>
      <input
        type="password"
        name="login_password"
        placeholder="Password"
        defaultValue="Starcraft2"
      />
    </label>

    <Link
      className="btn-floating btn-large waves-effect waves-light red"
      to="/admin"
    >
      <i className="material-icons">close</i>
    </Link>
    <button
      className="btn-floating btn-large waves-effect waves-light blue right"
      type="submit"
    >
      <i className="material-icons">send</i>
    </button>
  </form>
);

export default view(LoginPanel);
