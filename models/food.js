const mongoose = require("mongoose");
const FoodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
  location: {
    type: {
      type: String,
      required: true,
    },
    coordinates: {
      type: [Number], //the type is an array of numbers
      index: "2dsphere",
    },
  },
  foodType: {
    type: String,
    required: true,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("food", FoodSchema);
