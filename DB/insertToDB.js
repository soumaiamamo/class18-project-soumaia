const db = require('../server/api/db')
const houses = require('./main.json')

  // houses.forEach(house => {
  //   const { id, link, market_date, location_country, location_city, location_address, location_coordinates_lat, location_coordinates_lng, size_living_area, size_rooms, price_value, price_currency, description, title, images, sold } = house
  //   let storeHouses =
  `replace into houses( link,
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
     ) VALUES (?) `;

  // let qurArr = []
  // qurArr.push(id)
  // qurArr.push(link)
  // qurArr.push(market_date)
  // qurArr.push(location_country)
  // qurArr.push(location_city)
  // qurArr.push(location_address)
  // qurArr.push(location_coordinates_lat)
  // qurArr.push(location_coordinates_lng)
  // qurArr.push(size_living_area)
  // qurArr.push(size_rooms)
  // qurArr.push(price_value)
  // qurArr.push(price_currency)
  // qurArr.push(description)
  // qurArr.push(title)
  // qurArr.push(images)
  // qurArr.push(sold)


//   db.query(storeHouses, [...qurArr], (error, results, fields) => {
//     if (error) console.log('error with inserting', error)
//     else console.log('data inserted')
//   })
// });