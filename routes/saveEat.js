const express = require("express");
const router = express.Router();
const FoodSchema = require("../models/food");
const ReservationCenterSchema = require("../models/reservationCenter");

//Add Food Data in Data Base
/*
Sample Payload

{
    "name":"Paneer Tikka",
    "area":"Mahim",
    "location":{
        "type":"Point",
        "coordinates":[19.0354, 72.8423]
    },
    "foodType": "veg"
}
*/

router.post("/food/add", async (req, res) => {
  let { name, area, location, foodType } = req.body;

  const food = new FoodSchema({
    name: name,
    area: area,
    location: location,
    foodType: foodType,
  });

  try {
    let newFood = await food.save();
    res.status(201).json(newFood);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

//Add Reservation Center Data in Data Base
/*
Sample Payload
{
    "name": "Reservation Center 2",
    "area": "Bandra",
    "location":{
        "type":"Point",
        "coordinates":[19.0596, 72.8295]
    },
    "availableSeats": 20,
    "totalSeats": 30,
    "contactPerson": {
        "name":"Hamza Shaikh",
        "phoneNumber":"1111111111"
    },
    "availableFood": [
        {
            "foodName":"Paneer Tikka",
            "foodQty": 10
        },
        {
            "foodName":"Chicken Roll",
            "foodQty": 0
        }
    ]
  }
*/

router.post("/reservationCenter/add", async (req, res) => {
  let {
    name,
    area,
    location,
    availableSeats,
    totalSeats,
    contactPerson,
    availableFood,
  } = req.body;

  const reservationCenter = new ReservationCenterSchema({
    name: name,
    area: area,
    location: location,
    availableSeats: availableSeats,
    totalSeats: totalSeats,
    contactPerson: contactPerson,
    availableFood: availableFood,
  });

  try {
    let newReservationCenter = await reservationCenter.save();
    res.status(201).json(newReservationCenter);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

router.get("/getPopularFood", async (req, res) => {
  let { lat, long } = req.query;
  let maxDistance = 1000; //Max Distance is the radius in which we are getting the data
  try {
    const foods = await FoodSchema.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [parseFloat(long), parseFloat(lat)],
          },
          key: "location",
          maxDistance: parseFloat(maxDistance) * 1609,
          distanceField: "distanceCalculated",
          spherical: true,
        },
      },
    ]);
    res.status(200).json(foods);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

router.get("/getReservationCenter", async (req, res) => {
  let { lat, long, foodName } = req.query;
  let maxDistance = 1000; //Max Distance is the radius in which we are getting the data
  try {
    const reservationCenter = await ReservationCenterSchema.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [parseFloat(long), parseFloat(lat)],
          },
          key: "location",
          query: { "availableFood.foodName": foodName },
          maxDistance: parseFloat(maxDistance) * 1609,
          distanceField: "distanceCalculated",
          spherical: true,
        },
      },
    ]);
    res.status(200).json(reservationCenter);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

module.exports = router;
