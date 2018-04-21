const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const translations = require("../helpers/translations").en;

const ProductCategorySchema = new Schema({
  title: {
    type: String,
    required: [true, translations.title_required]
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "product"
    }
  ]
});

const ProductCategory = mongoose.model(
  "productCategory",
  ProductCategorySchema
);

module.exports = ProductCategory;
