const express = require("express");
const bodyParser = require("body-parser");
//const apiRouter = require("./api/index");
const db = require('./api/db')
const { houseForSqlQuery, validHouse } = require("./validation");
const app = express();
const apiRouter = require('express').Router();



app.use(bodyParser.json());

// let houseId = 3;


// let fakeDB = [

//   {
//     "link": "www.facebook.com",
//     "market_date": "01-01-2019",
//     "location_country": "syria",
//     "location_city": "damascus",
//     "location_address": "sdf",
//     "location_coordinates_lat": 1.233445,
//     "location_coordinates_lng": 2.676677,
//     "size_living_area": 5,
//     "size_rooms": 5,
//     "price_value": 1000,
//     "price_currency": "EUR",
//     "description": "WER",
//     "title": "RE",
//     "images": "",
//     "sold": 1
//   },
//   {
//     "link": "www.twitter.com",
//     "market_date": "01-01-2018",
//     "location_country": "syria",
//     "location_city": "damascus",
//     "location_address": "sdf",
//     "location_coordinates_lat": 1.233445,
//     "location_coordinates_lng": 2.676677,
//     "size_living_area": 5,
//     "size_rooms": 5,
//     "price_value": 1000,
//     "price_currency": "EUR",
//     "description": "WER",
//     "title": "RE",
//     "images": "cgxfr",
//     "sold": 1
//   }

// ]
const addHousesSql = `REPLACE INTO houses (
  link ,
  market_date,
  location_country,
  location_city ,
  location_address,
  location_coordinates_lat,
  location_coordinates_lng,
  size_living_area,
  size_rooms,
  price_value,
  price_currency,
  description,
  title,
  images,
  sold
  ) values ?`;


// app.get("/api", apiRouter);

// app.get("/houses", function (req, res) {
//   res.send(fakeDB);
// });


app.post('/houses', async (req, res) => {
  if (!Array.isArray(req.body)) {

    return res.status(400).json({ error: "data should be an array" })

  }


  const processedData = req.body.map(validHouse);



  // console.log(processedData);

  // res.json({ ok: 1 });



  const validData = [];
  const invalidData = [];

  processedData.forEach(
    el => {
      if (el.valid) {
        validData.push(el);
      } else {
        invalidData.push(el);
      }
    }
  )

  const report = {
    valid: validData.length,
    invalid: invalidData,
  };

  if (validData.length) {
    try {

      const houseData = validData.map((el) => { houseForSqlQuery(el.raw) });
      await db.queryPromise(addHousesSql, [houseData]);



      return res.json(report);

    } catch (err) {
      return res.status(500).json
        ({ error: err.message });
    }
  } else {
    res.json(report);

  }
});


app.use('*', (req, res) => {
  res.status(404).end();
});


// let { price } = req.body;

// if (typeof price == "undefind" || price <= 0 || Number.isNaN(price)) {
//   res.status(400).end("this is not valid price ")
// } else {
//   houseId++;
// }


// const item = {
//   id: houseId,
//   price
// };



// (async function () {
//   db.connect();
//   const result = await db.queryPromise(addHousesSql, housesData, cb);
//   console.log(result);
//   db.end();
// })();

// fakeDB.push(item);

// res.json(item);






// app.get("/houses/:id", function (req, res) {
//   const { id } = req.params;

//   const item = fakeDB.find((house) => {
//     return house.id === parseInt(id, 10);
//   });
//   if (item) {
//     res.json(item)
//   } else {
//     res.send("there are no houses with this id ")
//   }
// })

// app.delete("/houses/:id", function (req, res) {

//   let { id } = req.params;

//   fakeDB = fakeDB.filter((item) => item.id !== parseInt(id, 10))


// })


module.exports = app;
