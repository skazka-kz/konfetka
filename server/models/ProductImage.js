const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductImageSchema = new Schema({
  title: String,
  path: String,
  width: Number,
  height: Number,
  size: Number,
  dateAdded: {
    type: Date,
    default: Date.now
  },
  originalFileName: String,
  product: {
    type: Schema.Types.ObjectId,
    ref: "product"
  },
  thumbnailUrl: String,
  thumbnailSize: Number,
  preSaveId: Number
});

const ProductImage = mongoose.model("productImage", ProductImageSchema);

module.exports = ProductImage;
