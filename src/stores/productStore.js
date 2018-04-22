// Global state store
import { store } from "react-easy-state";
import axios from "axios/index";

const productStore = store({
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
    productStore.calculateFilter();
    productStore.calculateSort();
    productStore.totalPages = Math.ceil(productStore.finishedBuffer.length / productStore.perPage);
    productStore.setPage(productStore.currentPage);
  },
  setPage(pageNum) {
    const startNum = (pageNum - 1) * productStore.perPage;
    productStore.pagedProducts = productStore.finishedBuffer.slice(
      startNum,
      startNum + productStore.perPage
    );
    productStore.currentPage = pageNum;
  },
  add(product) {
    productStore.all.push(product);
  },
  changeFilter(newFilter) {
    console.log(`New filter: ${newFilter}`);
    productStore.filter = newFilter;
    productStore.calculate();
  },
  changeSort(newSort) {
    productStore.sort = newSort;
    productStore.calculate();
  },
  calculateSort() {
    switch (productStore.sort) {
      case "alph_asc":
        productStore.finishedBuffer = productStore.filteredBuffer.sort(alpAscCompare);
        break;
      case "alph_desc":
        productStore.finishedBuffer = productStore.filteredBuffer.sort(alpDescCompare);
        break;
      case "price_asc":
        productStore.finishedBuffer = productStore.filteredBuffer.sort(priceAscCompare);
        break;
      case "price_desc":
        productStore.finishedBuffer = productStore.filteredBuffer.sort(priceDescCompare);
        break;
      default:
        productStore.finishedBuffer = productStore.filteredBuffer;
    }
  },
  calculateFilter() {
    // If no filter is set, skip, otherwise filter category ids that are selected
    if (productStore.filter === null || productStore.filter === "") {
      productStore.filteredBuffer = productStore.all;
      return;
    }
    productStore.filteredBuffer = productStore.all.filter(
      item => productStore.filter === item.category
    );
  },
  async loadProducts() {
    const response = await axios.get("/api/products");
    productStore.all = productStore.filteredBuffer = productStore.finishedBuffer = response.data;
    productStore.calculate();
  },
  async deleteProduct(id) {
    const response = await axios.delete(`/api/products/${id}`);
    if (response.status === 200) {
      productStore.all = productStore.all.filter(item => item._id !== id);
      productStore.calculate();
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
      const response = await axios.post("/api/products", formData);
      if (response.status === 200) {
        productStore.loadProducts();
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
      const response = await axios.post("/api/products/image", formData);
      if (response.status === 200) {
        const newImage = response.data;
        productStore.all.forEach(product => {
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
        productStore.replaceProduct(productId, response.data);
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
    productStore.all = productStore.all.map(product => {
      if (id !== product._id) {
        return product;
      } else {
        return newProduct;
      }
    });
    productStore.calculate();
  },
  async updateProduct(id, formData) {
    try {
      const response = await axios.put(`/api/products/${id}`, formData);
      if (response.status === 200) {
        productStore.replaceProduct(id, response.data);
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
      const response = await axios.delete(`/api/products/image/${imageId}`);
      if (response.status === 200) {
        productStore.replaceProduct(productId, response.data);
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

export default productStore;