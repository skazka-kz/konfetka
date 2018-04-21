const mongoose = require("mongoose");
const { Schema } = mongoose;

const translations = require("../helpers/translations").en;

const CitySchema = new Schema({
  title: {
    type: String,
    required: [true, translations.title_required]
  },
  shops: [
    {
      type: Schema.Types.ObjectId,
      ref: "shop"
    }
  ]
});

const City = mongoose.model("city", CitySchema);

module.exports = City;
