
const validator = require('validator');


const requiredFields = [


  'id',
  'link',
  'market_date',
  'location_country',
  'location_city',
  'location_address',
  'location_coordinates_lat',
  'location_coordinates_lng',
  'size_living_area',
  'size_rooms',
  'price_value',
  'price_currency',
  'description',
  'title',
  'images text',
  'sold'


];


const validHouse = (houseObject) => {
  let valid = true;
  let errors = [];


  if (typeof houseObject !== 'object') {
    valid = false;
    errors.push('house shoile be an object')
  } else {
    requiredFields.forEach(field => {
      if (typeof houseObject[field] === "undefiend") {
        errors.push(`${field}: is required`)
        valid = false;
      }

    });

    if (!validator.isURL(houseObject['link'])) {
      valid = false;
      error.push(`link : must be valid URL`);
    }


    if (!validator.isNumeric(houseObject['link'])) {
      valid = false;
      error.push(`price_value: wrongn numeric value `);
    }
  }


  return {
    valid,
    errors,
    raw: houseObject
  };
};

module.exports = { validHouse };
