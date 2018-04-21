import React, { Component } from "react";
import authHelper from "../helpers/authHelper";

export default class AuthPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      user: null
    };
  }

  async componentDidMount() {
    await this.handleShowCurrentUser();
  }

  handleLogin = async (username, pass) => {
    const response = await authHelper.authenticate(
      "test@test.test",
      "adamsgreat"
    );
    if (response) {
      this.setState({
        isAuthenticated: true,
        user: response
      });
    }
  };

  handleLogout = async () => {
    await authHelper.logout();
    this.setState({ isAuthenticated: false, user: null });
  };

  handleShowCurrentUser = async () => {
    const currentUser = await authHelper.getCurrentUser();
    if (currentUser) {
      this.setState({
        isAuthenticated: true,
        user: currentUser
      });
    }
  };

  render() {
    return (
      <div>
        <h3>Status:</h3>
        <p>Authenticated: {this.state.isAuthenticated.toString()}</p>
        <button onClick={this.handleLogin}>Login</button>
        <button onClick={this.handleLogout}>Logout</button>
        <button onClick={this.handleShowCurrentUser}>Fetch current user</button>

        {this.state.isAuthenticated && this.state.user ? (
          <ul>
            <li>Full name: {this.state.user.fullName}</li>
            <li>Email: {this.state.user.email}</li>
          </ul>
        ) : (
          "Not logged in"
        )}
      </div>
    );
  }
}
