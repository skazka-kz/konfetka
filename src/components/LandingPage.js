import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Header, HeaderLogo } from "./styled/frontPageCollection";
import MainPage from "./MainPage";
import asyncComponent from "./asyncComponent";

import logo from "../resources/logo.png";

export default class LandingPage extends Component {
  render() {
    return (
      <div>
        <Header>
          <HeaderLogo src={logo} />
        </Header>

        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route
            path="/finder"
            component={asyncComponent(() => import("./front/map/ShopFinder"))}
          />
        </Switch>
      </div>
    );
  }
}
