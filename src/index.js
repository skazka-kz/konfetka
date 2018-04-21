import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import asyncComponent from "./components/asyncComponent";
import "./global.css";

const AsyncAdminDashboard = asyncComponent(() =>
  import("./components/admin/AdminDashboard")
);

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/admin" component={AsyncAdminDashboard} />
      <Route path="/" component={LandingPage} />
    </Switch>
  </BrowserRouter>,
  document.getElementById("konfetka-app")
);
