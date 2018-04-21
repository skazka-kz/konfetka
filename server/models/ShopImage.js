const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ShopImageSchema = new Schema({
  title: String,
  path: String,
  width: Number,
  height: Number,
  size: Number,
  shop: {
    type: Schema.Types.ObjectId,
    ref: "shop"
  }
});

const ShopImage = mongoose.model("shopImage", ShopImageSchema);

module.exports = ShopImage;
