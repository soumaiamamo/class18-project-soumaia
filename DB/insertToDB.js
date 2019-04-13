const db = require('./db')
const houses = require('./main.json')

houses.forEach(house => {
  const { id, price, description } = house
  let storeHouses =
    `replace into houses (id, link, market_date,location_country,location_city,location_address,location_coordinates_lat,location_coordinates_lng,size_living_area ,size_rooms ,price_value ,price_currency , description , title ,images,sold ) VALUES ?`;

  let qurArr = []
  qurArr.push(id)
  qurArr.push(price)
  qurArr.push(description)


  db.query(storeHouses, [...qurArr], (error, results, fields) => {
    if (error) console.log('error with inserting', error)
    else console.log('data inserted')
  })
});