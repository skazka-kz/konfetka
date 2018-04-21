const City = require("../models/City");
const Product = require("../models/Product");
const ProductCategory = require("../models/ProductCategory");
const ProductImage = require("../models/ProductImage");
const Shop = require("../models/Shop");
const ShopImage = require("../models/ShopImage");
const User = require("../models/User");

module.exports = {
  createSampleCity(title = "a shop") {
    return new City({
      title: title
    });
  },
  createSampleProduct(title = "a product") {
    return new Product({
      title: title,
      description: "Some longer description of the product",
      weight: "100g",
      price: "100rupees"
    });
  },
  createSampleProductCategory(title = "a product category") {
    return new ProductCategory({ title });
  },
  createSampleProductImage(title = "a product image") {
    return new ProductImage({
      title,
      path: "/some/path/file.png",
      originalFileName: "somefile.png",
      width: 500,
      height: 400,
      size: 1254367
    });
  },
  createSampleShop(name = "a shop") {
    return new Shop({
      title: name,
      longName: "Some longer name",
      addressLineOne: "169 Wallaby Way",
      addressLineTwo: "Sydney, Australia",
      openingHours: "9-6 7 days a week"
    });
  },
  createSampleShopImage(title = "a shop image") {
    return new ShopImage({
      title,
      path: "/some/path/file.png",
      width: 500,
      height: 400,
      size: 1254367
    });
  },
  createSampleUser(email = "test@test.com") {
    return new User({
      googleId: "somegoogleid",
      authType: "email",
      email: email,
      password: "someHash",
      fullName: "a user",
      nickName: "Some nick",
      isAdmin: false,
      isEditor: false
    });
  }
};
