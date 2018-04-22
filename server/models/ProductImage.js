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

// Remove the server/ bit from the path
ProductImageSchema.pre("save", async function save(next) {
  const image = this;
  if (!image.isModified('path')) { return next(); }
  image.path = image.path.replace(/server\//, "");
  next();
});

const ProductImage = mongoose.model("productImage", ProductImageSchema);

module.exports = ProductImage;
