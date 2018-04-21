import React from "react";
import { Link } from "react-router-dom";
import { store, view } from "react-easy-state";
import authStore from "../../../stores/authStore";
import overlayStore from "../../../stores/overlayStore";
import styled from "styled-components";

//import authHelper from '../../helpers/authHelper';

const StatusBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  a {
    padding: 0.5rem;
  }
`;

const ProfileLink = styled(Link)`
  text-decoration: underline;
`;

const LogoutLink = styled.a`
  background-color: purple;
  border-radius: 0.25rem;
  cursor: pointer;
`;

class AuthenticationPanel extends React.Component {
  localState = store({
    panelOpen: false,
    formSelected: "login"
  });

  async componentDidMount() {
    await authStore.getCurrentUser();
  }

  handleExpandPanel = () => {
    this.localState.panelOpen = !this.localState.panelOpen;
    overlayStore.toggle();
  };

  handleLoginSubmit = async e => {
    e.preventDefault();
    const email = e.target.elements.login_email.value;
    const pass = e.target.elements.login_password.value;

    await authStore.authenticate(email, pass);
    if (authStore.authenticated) {
      this.handleExpandPanel();
    }
  };

  handleRegisterSubmit = async e => {};

  handleLogout = async () => {
    await authStore.logout();
  };

  handleFormChange = e => {
    e.preventDefault();
    this.localState.formSelected = e.target.value;
  };

  render() {
    const isLoggedIn = authStore.authenticated && authStore.user;
    const statusText = isLoggedIn
      ? `${authStore.user.fullName}`
      : "Login / Register";
    const icon = (
      <ProfileLink
        to="/admin/login"
        style={{ display: "flex", cursor: "pointer" }}
      >
        {statusText}
      </ProfileLink>
    );

    const logoutLink = isLoggedIn ? (
      <LogoutLink onClick={this.handleLogout}>Logout</LogoutLink>
    ) : null;

    return (
      <StatusBox>
        {icon}
        {logoutLink}
      </StatusBox>
    );
  }
}

export default view(AuthenticationPanel);
