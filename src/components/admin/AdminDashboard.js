import React, { Component } from "react";
import { Link, NavLink, Route, Switch } from "react-router-dom";
import { view } from "react-easy-state";
import styled from "styled-components";
import "../../../node_modules/materialize-css/dist/css/materialize.min.css";
import "./AdminDashboard.css";
import AuthPanel from "./authentication/AuthenticationPanel";
import ProductSection from "./products/ProductsSection";
import Overlay from "./authentication/Overlay";
import CategoriesSection from "./categories/CategoriesSection";
import authStore from "../../stores/authStore";
import Profile from "./authentication/Profile";
import LoginPanel from "./authentication/LoginPanel";
import RegisterPanel from "./authentication/RegisterPanel";

const Stores = () => <h1>Stores</h1>;
const Users = () => <h1>Users</h1>;
const Promotions = () => <h1>Promotions</h1>;

const Header = styled.div`
  display: flex;
  justify-content: space-around;
  color: white;

  a {
    color: white;
  }
`;

const LargeLink = styled(Link)`
  font-size: 2rem;
  padding: 0.5rem;
`;

class AdminDashboard extends Component {
  async componentDidMount() {
    await authStore.getCurrentUser();
    if (!authStore.authenticated) {
      this.props.history.push("/admin/login");
    }
  }

  render() {
    const isLoggedIn = authStore.authenticated && authStore.user;
    const router = isLoggedIn ? (
      <div className="row">
        <div className="col s12 m4 l3 full-min-height">
          <h4 className="center">Разделы</h4>
          <div className="collection">
            <NavLink to="/admin/products" className="collection-item">
              Наименования
            </NavLink>
            <NavLink to="/admin/categories" className="collection-item">
              Категории
            </NavLink>
            <NavLink to="/admin/stores" className="collection-item">
              Магазины
            </NavLink>
            <NavLink to="/admin/users" className="collection-item">
              Пользователи
            </NavLink>
            <NavLink to="/admin/promotions" className="collection-item">
              Акции
            </NavLink>
            <NavLink to="/admin/profile" className="collection-item">
              Мой профиль
            </NavLink>
          </div>
        </div>
        <div className="col s12 m8 l9 full-min-height">
          <Switch>
            <Route path="/admin/products" component={ProductSection} />
            <Route path="/admin/categories" component={CategoriesSection} />
            <Route exact path="/admin/stores" component={Stores} />
            <Route exact path="/admin/users" component={Users} />
            <Route exact path="/admin/promotions" component={Promotions} />
            <Route exact path="/admin/profile" component={Profile} />
          </Switch>
        </div>
      </div>
    ) : (
      <div className="row">
        <div className="col s12 m4 l3 full-min-height">
          <h4 className="center">Разделы</h4>
          <div className="collection">
            <NavLink to="/admin/login" className="collection-item">
              Логин
            </NavLink>
            <NavLink to="/admin/register" className="collection-item">
              Регистрация
            </NavLink>
          </div>
        </div>
        <div className="col s12 m8 l9 full-min-height">
          <Switch>
            <Route path="/admin/login" component={LoginPanel} />
            <Route path="/admin/register" component={RegisterPanel} />
          </Switch>
        </div>
      </div>
    );
    return (
      <div>
        <Header className="deep-orange">
          <Link to="/">Назад</Link>
          <LargeLink to="/admin">Конфетка, панель управления</LargeLink>
          <AuthPanel />
        </Header>

        <Overlay />
        {router}
      </div>
    );
  }
}

export default view(AdminDashboard);
