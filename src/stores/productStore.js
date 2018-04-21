// Global state store
import { store } from "react-easy-state";
import axios from "axios/index";

export default store({
  all: [],
  filteredBuffer: null,
  finishedBuffer: null,
  pagedProducts: [],
  filter: null,
  sort: null,
  perPage: 10,
  currentPage: 1,
  totalPages: 0,
  calculate() {
    this.calculateFilter();
    this.calculateSort();
    this.totalPages = Math.ceil(this.finishedBuffer.length / this.perPage);
    this.setPage(this.currentPage);
  },
  setPage(pageNum) {
    const startNum = (pageNum - 1) * this.perPage;
    this.pagedProducts = this.finishedBuffer.slice(
      startNum,
      startNum + this.perPage
    );
    this.currentPage = pageNum;
  },
  add(product) {
    this.all.push(product);
  },
  changeFilter(newFilter) {
    console.log(`New filter: ${newFilter}`);
    this.filter = newFilter;
    this.calculate();
  },
  changeSort(newSort) {
    this.sort = newSort;
    this.calculate();
  },
  calculateSort() {
    switch (this.sort) {
      case "alph_asc":
        this.finishedBuffer = this.filteredBuffer.sort(alpAscCompare);
        break;
      case "alph_desc":
        this.finishedBuffer = this.filteredBuffer.sort(alpDescCompare);
        break;
      case "price_asc":
        this.finishedBuffer = this.filteredBuffer.sort(priceAscCompare);
        break;
      case "price_desc":
        this.finishedBuffer = this.filteredBuffer.sort(priceDescCompare);
        break;
      default:
        this.finishedBuffer = this.filteredBuffer;
    }
  },
  calculateFilter() {
    // If no filter is set, skip, otherwise filter category ids that are selected
    if (this.filter === null || this.filter === "") {
      this.filteredBuffer = this.all;
      return;
    }
    this.filteredBuffer = this.all.filter(
      item => this.filter === item.category
    );
  },
  async loadProducts() {
    const response = await axios.get("/api/product?accept_cached=1");
    this.all = this.filteredBuffer = this.finishedBuffer = response.data;
    this.calculate();
  },
  async deleteProduct(id) {
    const response = await axios.delete(`/api/product/${id}`);
    if (response.status === 200) {
      this.all = this.all.filter(item => item._id !== id);
      this.calculate();
    } else {
      if (response.data.message) {
        alert("Error deleting a product: " + response.data.message);
      } else {
        alert("Error deleting a product");
      }
    }
  },
  async addProduct(formData) {
    try {
      const response = await axios.post("/api/product", formData);
      if (response.status === 200) {
        this.loadProducts();
      } else {
        if (response.data.message) {
          alert("Error adding product: " + response.data.message);
        } else {
          alert("Error adding product. Check console for details");
        }
      }
    } catch (e) {
      console.log(e);
      alert(
        "Error adding product. Check console for details " +
          e.response.data.message
      );
    }
  },
  async addProductImage(formData) {
    try {
      const response = await axios.post("/api/product/image", formData);
      if (response.status === 200) {
        const newImage = response.data;
        this.all.forEach(product => {
          if (product._id === newImage.product) {
            product.images.push(newImage);
          }
        });
      } else {
        console.log(response);
        if (response.data.message) {
          alert("Error adding product image: " + response.data.message);
        } else {
          alert("Error adding product image. Check console for details");
        }
      }
    } catch (e) {
      console.log(e);
      alert(
        "Error adding product image. Check console for details " +
          e.response.data.message
      );
    }
  },
  async makeImagePrimaryImage(productId, imageId) {
    try {
      const response = await axios.get(
        `/api/misc/set_primary_product_image?productId=${productId}&imageId=${imageId}`
      );
      if (response.status === 200) {
        this.replaceProduct(productId, response.data);
      } else {
        console.log(response);
        if (response.data.message) {
          alert("Error making the image primary: " + response.data.message);
        } else {
          alert("Error making the image primary. Check console for details");
        }
      }
    } catch (e) {
      alert(
        "Error adding product image. Check console for details " +
          e.response.data.message
      );
      console.log(e);
    }
  },
  replaceProduct(id, newProduct) {
    this.all = this.all.map(product => {
      if (id !== product._id) {
        return product;
      } else {
        return newProduct;
      }
    });
    this.calculate();
  },
  async updateProduct(id, formData) {
    try {
      const response = await axios.put(`/api/product/${id}`, formData);
      if (response.status === 200) {
        this.replaceProduct(id, response.data);
      } else {
        console.log(response);
        if (response.data.message) {
          alert("Error updating product: " + response.data.message);
        } else {
          alert("Error updating product. Check console for details");
        }
      }
    } catch (e) {
      console.log(e);
      alert(
        "Error updating product. Check console for details. " +
          e.response.data.message
      );
    }
  },
  async deleteProductImage(productId, imageId) {
    try {
      const response = await axios.delete(`/api/product/image/${imageId}`);
      if (response.status === 200) {
        this.replaceProduct(productId, response.data);
      } else {
        console.log(response);
        if (response.data.message) {
          alert("Error deleting image: " + response.data.message);
        } else {
          alert("Error deleting image. Check console for details");
        }
      }
    } catch (e) {
      console.log(e);
      alert(
        "Error deleting image. Check console for details " +
          e.response.data.message
      );
    }
  }
});

// Helper filter functions
const alpAscCompare = (itemA, itemB) => {
  if (itemA.title < itemB.title) return -1;
  if (itemA.title > itemB.title) return 1;
  return 0;
};
const alpDescCompare = (itemA, itemB) => {
  if (itemA.title > itemB.title) return -1;
  if (itemA.title < itemB.title) return 1;
  return 0;
};
const priceAscCompare = (itemA, itemB) => {
  return Number.parseFloat(itemA.price) > Number.parseFloat(itemB.price);
};
const priceDescCompare = (itemA, itemB) => {
  return Number.parseFloat(itemA.price) < Number.parseFloat(itemB.price);
};
