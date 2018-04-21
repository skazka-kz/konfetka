// A Model to manage a list of shops and cities they're in
const mongoose = require("mongoose");
const { Schema } = mongoose;

const translations = require("../helpers/translations").en;

const ShopSchema = new Schema({
  title: {
    type: String,
    required: [true, translations.title_required]
  },
  city: {
    type: Schema.Types.ObjectId,
    ref: "city"
  },
  longName: String,
  addressLineOne: String,
  addressLineTwo: String,
  openingHours: String,
  latitude: String,
  longitude: String,
  images: [
    {
      type: Schema.Types.ObjectId,
      ref: "shopImage"
    }
  ]
});

const Shop = mongoose.model("shop", ShopSchema);

module.exports = Shop;
