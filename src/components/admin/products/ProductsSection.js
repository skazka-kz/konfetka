import React, { Component } from "react";
import { view } from "react-easy-state";
import categoryStore from "../../../stores/categoryStore";
import { Route } from "react-router-dom";
import ProductList from "./ProductList";
import NewProductForm from "./NewProductForm";

class ProductsSection extends Component {
  async componentDidMount() {
    await categoryStore.loadAll();
  }
  render() {
    return (
      <div>
        <h2>Наименования</h2>
        <Route exact path="/admin/products/new" component={NewProductForm} />
        <Route path="/admin/products" component={ProductList} />
      </div>
    );
  }
}

export default view(ProductsSection);
