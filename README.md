# Nearest-Popular-Food-and-Reservation-Center
This api allows you to get data of your nearest popular food and Reservation Centres.

#### You need to create an env file using the env.example file.

## API Reference
#### Base URL of the APIs is http://localhost:3000/saveEat/
#### Add Food items

```http
POST /food/add
```

```
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


```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Given Payload` | `JSON Object` | This api allows you to add data in database |

#### Add Reservation Center

```http
POST /reservationCenter/add
```

```
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


```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Given Payload` | `JSON Object` | This api allows you to add data in database |


#### Get NearBy Food Items

```http
GET /getPopularFood?lat=19.0269&long=72.8553
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `lat and long` | `Query Values` | This API takes lat long in query and returns all the popular foods in nearest to that location |


#### Get Neares Reservation Center that has the given Food Items

```http
GET /getReservationCenter?lat=19.0269&long=72.8553
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `lat, long` | `Query Values` | This API takes in lat long and foodName and returns the data of the nearest reservation center that has that food item. It also returns the quantity of the food item and other details necessary to ensure a seamless booking |

