import React from "react";
import { store, view } from "react-easy-state";
import ReactPaginate from "react-paginate";
import styled from "styled-components";
import productStore from "../../../stores/productStore";
import categoryStore from "../../../stores/categoryStore";
import LoadingOverlay from "./LoadingOverlay";
import EditableListItem from "./EditableListItem";
import { Link } from "react-router-dom";
import { ProductListWrapper } from "./ProductRelatedStyled";

import "./paginator.css";

const FilterElements = styled.div`
  display: flex;
  justify-content: space-evenly;

  option {
    margin: 1rem 0.25rem;
  }
`;

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.localState = store({
      isLoading: true
    });
  }

  async componentDidMount() {
    await productStore.loadProducts();
    this.localState.isLoading = false;
  }

  handleProductDelete = async id => {
    this.localState.isLoading = true;
    await productStore.deleteProduct(id);
    this.localState.isLoading = false;
  };

  handlePageSelected = async e => {
    productStore.setPage(e.selected + 1);
  };

  handleFilterChange = e => {
    productStore.changeFilter(e.target.value);
  };

  handleSortChange = e => {
    productStore.changeSort(e.target.value);
  };

  render() {
    return (
      <div>
        <FilterElements>
          <select
            name="sort_order"
            className="browser-default"
            onChange={this.handleSortChange}
          >
            <option key={1}>Сортировка</option>
            <option key={2} value="alph_asc">А -> Я</option>
            <option key={3} value="alph_desc">Я -> А</option>
            <option key={4} value="price_asc">Сначала дешевые</option>
            <option key={5} value="price_desc">Сначала дорогие</option>
          </select>
          <select
            name="filtered_category"
            id="f_cat"
            className="browser-default"
            onChange={this.handleFilterChange}
          >
            <option key={123} value="">Категория</option>
            {categoryStore.all.map((item, order) => (
              <option key={item._id} value={item._id}>
                {item.title}
              </option>
            ))}
          </select>
        </FilterElements>
        <Link
          to="/admin/products/new"
          className="btn-floating waves-effect waves-light red"
        >
          <i className="material-icons">add</i>
        </Link>
        <ProductListWrapper className="collection">
          {productStore.pagedProducts.map(product => {
            return (
              <EditableListItem
                key={product._id}
                product={product}
                handleDelete={this.handleProductDelete}
              />
            );
          })}
          <LoadingOverlay isLoading={this.localState.isLoading} />
          <div className="pagination">
            <ReactPaginate
              pageCount={productStore.totalPages}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              onPageChange={this.handlePageSelected}
            />
          </div>
        </ProductListWrapper>
      </div>
    );
  }
}

export default view(ProductList);
