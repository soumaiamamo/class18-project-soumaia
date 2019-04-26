const express = require("express");
const bodyParser = require("body-parser");
//const apiRouter = require("./api/index");
const db = require('./api/db')
const { houseForSqlQuery, validHouse } = require("./validation");
const app = express();
const apiRouter = require('express').Router();



const HOUSES_PER_PAGE = 5;


app.use(bodyParser.json());


let houseId = 3;


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
const addHousesSql = `INSERT INTO houses (
  link, 
  market_date, 
  location_country, 
  location_city, 
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
  ) VALUES ?`;




apiRouter  // to get houses from database .. :
  .route('/houses')
  .get(async (req, res) => {


    //they will be default values :
    let {
      price_min = 0,
      price_max = 10000000,
      order = "location_country_asc",
      page = 1,
      location_city = ''
    } = req.query;


    price_min = parseInt(price_min, 10);
    if (Number.isNaN(price_min) || price_min < 0) {

      return res.status(400).json(
        { error: `'price_min ' should be a positive number` }
      )
    }

    price_max = parseInt(price_max, 10);

    if (Number.isNaN(price_max) || price_max < 0) {

      return res.status(400).json(
        { error: `'price_max ' should be a positive number` }
      )
    }

    if (price_max < price_min) {

      return res.status(400).json(
        {
          error: `'price_max' should be bigger than 'price_min'`
        }
      )

    }
    page = parseInt(page, 10);

    if (Number.isNaN(page) || page <= 0) {
      return res.status(400).json({
        error: ` 'page' should be a number more than 0 `
      });
    }



    const offset = (page - 1) * HOUSES_PER_PAGE;


    const conditions = [`( price_value between ? and ? )`];

    const params = [price_min, price_max];

    if (location_city.length) {
      conditions.push(`location_city = '?'`)
      params.push(city);
    }

    if (country.length) {
      conditions.push(`country = 'country name'`)
    }

    const queryBody = `
    where ${conditions.join(' and ')}
    `


    const queryTotal = `
    select count(id) as total
    ${queryBody}
      `;

    const queryItems = `   
      select *
      ${query} 
   
      order by ${db.escapeId(order_field, true)}  ${order_direction} 
      limit ${ HOUSES_PER_PAGE}
      offset ${offset}
  
        `

    try {
      const total = await db.queryPromise(queryTotal, params);
      const houses = await db.queryPromise(queryItems, params);

      res.json({ total: total[0].total, houses, pageSize: HOUSES_PER_PAGE })
    } catch (err) {

      console.log(err.sql);
      console.log(Object.keys(err));
      res.status(400).json({ error: err.message })

    }


    let order_field, order_direction;

    const index = order.lastIndexOf('-');

    if (index > 0) {
      order_field = order.slice(0, index);
      order_direction = order.slice(index + 1);


      if (['asc', 'desc'].indexOf(order_direction) === -1) {

        return res.status(400).json({ error: "order params is wrong . " })

      }

    } else {

      return res.status(400).json({ error: "order params is wrong . " })
    }
    try {
      const houses = await db.queryPromise(query, params);

      res.json(houses)

    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  });





app.post('/houses', async (req, res) => {
  if (!Array.isArray(req.body)) {

    return res.status(400).json({ error: "data should be an array" })

  }


  const processedData = req.body.map(validHouse);





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
