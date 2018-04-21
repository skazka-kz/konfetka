// A Model to manage added products and categories
const mongoose = require("mongoose");
const { Schema } = mongoose;

const translations = require("../helpers/translations").en;

const ProductSchema = new Schema({
  title: {
    type: String,
    required: [true, translations.title_required],
    validate: {
      validator: title => {
        return title.length > 2;
      },
      message: translations.title_must_be_3
    },
    index: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "productCategory"
  },
  description: String,
  weight: String,
  price: String,
  dateAdded: {
    type: Date,
    default: Date.now
  },
  images: [
    {
      type: Schema.Types.ObjectId,
      ref: "productImage"
    }
  ],
  frontImage: {
    type: Schema.Types.ObjectId,
    ref: "productImage"
  }
});

const Product = mongoose.model("product", ProductSchema);

module.exports = Product;
