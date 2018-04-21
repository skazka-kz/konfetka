import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import ProductItem from "./ProductItem";
import {
  ProductContainer,
  OrangeHeader,
  SectionWrapper,
  PageContainer,
  PagePea,
  LargePea,
  CategoryContainer,
  CategoryItem
} from "../../styled/frontPageCollection";

class PopularProductsSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allProducts: [],
      filteredProducts: [],
      currentProducts: [],
      allCategories: [],
      selectedCategory: null,
      currentPage: 0,
      allPages: 1,
      perPage: props.perPage
    };
  }

  async componentDidMount() {
    let response;
    if (this.props.onlyPopular){
      response = await axios.get("/api/misc/popular_products");
    } else {
      response = await axios.get("/api/misc/all_products");
    }
    this.setState({
      allProducts: response.data,
      filteredProducts: response.data,
      currentProducts: response.data.slice(0, this.props.perPage),
      allPages: Math.ceil(response.data.length / this.props.perPage)
    });
    if (this.props.showCategories) {
      await this.loadCategories();
    }
  }

  handlePageSelected = pageNum => {
    // If out of scope, ignore
    if (pageNum < 0 || pageNum > this.state.allPages - 1) {
      return;
    }
    this.setState((oldState, props) => {
      const start = pageNum * props.perPage;
      return {
        currentProducts: oldState.filteredProducts.slice(
          start,
          start + props.perPage
        ),
        currentPage: pageNum
      };
    });
  };

  async loadCategories() {
    const response = await axios.get("/api/categories");
    this.setState(
      {
        allCategories: response.data,
        selectedCategory: response.data[0]
      },
      () => {
        this.handleCategorySelect(response.data[0]);
      }
    );
  }

  handleCategorySelect = cat => {
    const filtered = this.state.allProducts.filter(
      prod => prod.category === cat._id
    );
    this.setState(
      {
        selectedCategory: cat,
        filteredProducts: filtered,
        currentPage: 0
      },
      () => {
        this.handleFilterChange();
      }
    );
  };

  handleFilterChange() {
    this.setState(
      (oldState, props) => {
        const start = oldState.currentPage * props.perPage;
        return {
          currentProducts: oldState.filteredProducts.slice(
            start,
            start + props.perPage
          )
        };
      },
      () => {
        this.handlePagination();
      }
    );
  }

  handlePagination() {
    this.setState(oldState => ({
      allPages: Math.ceil(oldState.filteredProducts.length / this.props.perPage)
    }));
  }

  render() {
    const products = this.state.currentProducts.map(item => (
      <ProductItem key={item._id} {...item} />
    ));
    const pages = [...Array(this.state.allPages)].map((_, num) => (
      <PagePea
        key={num}
        selected={this.state.currentPage === num}
        onClick={() => {
          this.handlePageSelected(num);
        }}
      >
        ◉
      </PagePea>
    ));

    let categories = null;
    if (this.props.showCategories || this.state.selectedCategory !== null) {
      categories = this.state.allCategories.map(cat => (
        <CategoryItem
          key={cat._id}
          active={this.state.selectedCategory._id === cat._id}
          onClick={() => {
            this.handleCategorySelect(cat);
          }}
        >
          {cat.title}
        </CategoryItem>
      ));
    }

    return (
      <SectionWrapper>
        <OrangeHeader>{this.props.sectionTitle}</OrangeHeader>
        <CategoryContainer>{categories}</CategoryContainer>
        <ProductContainer>{products}</ProductContainer>
        <PageContainer>
          <LargePea
            isActive={this.state.currentPage !== 0}
            onClick={() => {
              this.handlePageSelected(this.state.currentPage - 1);
            }}
          >
            &lt;
          </LargePea>
          {pages}
          <LargePea
            isActive={this.state.currentPage !== this.state.allPages - 1}
            onClick={() => {
              this.handlePageSelected(this.state.currentPage + 1);
            }}
          >
            &gt;
          </LargePea>
        </PageContainer>
      </SectionWrapper>
    );
  }
}

PopularProductsSection.propTypes = {
  perPage: PropTypes.number,
  onlyPopular: PropTypes.bool,
  sectionTitle: PropTypes.string,
  showCategories: PropTypes.bool
};

export default PopularProductsSection;
