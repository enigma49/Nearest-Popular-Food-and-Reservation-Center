const mongoose = require("mongoose");
const ReservationCenterSchema = new mongoose.Schema({
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
  availableSeats: {
    type: Number,
    required: true,
  },
  totalSeats: {
    type: Number,
    required: true,
  },
  contactPerson: {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
  },
  availableFood: [
    {
      foodName: {
        type: String,
        required: true,
      },
      foodQty: {
        type: String,
        required: true,
      },
    },
  ],
  createdOn: {
    type: Date,
    default: Date.now,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("reservationCenter", ReservationCenterSchema);
