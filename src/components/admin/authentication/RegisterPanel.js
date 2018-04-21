import React from "react";
import { view } from "react-easy-state";
import { Link } from "react-router-dom";
import authStore from "../../../stores/authStore";

class RegisterPanel extends React.Component {
  render() {
    return (
      <form onSubmit={authStore.handleRegistration}>
        <h4>Register</h4>

        {this.props.error ? (
          <p className="red-text">{this.props.error}</p>
        ) : null}

        <input
          type="email"
          name="register_email"
          placeholder="your@email.com"
          required
        />
        <input
          type="password"
          name="register_password_1"
          placeholder="Password"
          required
        />
        <input
          type="password"
          name="register_password_2"
          placeholder="Repeat password"
          required
        />
        <input
          type="text"
          name="register_full_name"
          placeholder="Full name"
          required
        />
        <input
          type="text"
          name="register_nickname"
          placeholder="(Optional) Nickname"
        />
        <Link
          className="btn-floating btn-large waves-effect waves-light red"
          to="/"
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
  }
}

export default view(RegisterPanel);
