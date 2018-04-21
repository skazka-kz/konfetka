import React from "react";
import { Route, Switch } from "react-router-dom";
import { view } from "react-easy-state";
import RegisterPanel from "./RegisterPanel";
import LoginPanel from "./LoginPanel";

const Profile = props => (
  <div>
    <h1>My profile</h1>

    <Switch>
      <Route path="/admin/profile/login" component={LoginPanel} />
      <Route path="/admin/profile/register" component={RegisterPanel} />
    </Switch>
  </div>
);

Profile.propTypes = {};

export default view(Profile);
