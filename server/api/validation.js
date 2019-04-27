const validator = require('validator');


const requiredFields = [
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
  'images',
  'sold',
];

const validHouse = (houseObject) => {
  let valid = true;
  let errors = [];


  if (typeof houseObject !== 'object') {
    valid = false;

    errors.push('house should be an object')

  } else {



    requiredFields.forEach(field => {
      if (typeof houseObject[field] === "undefiend") {
        valid = false;
        errors.push(`${field}: is required`)

      }
    });

  }


  if (!validator.isURL(`${houseObject['link']}`)) {
    valid = false;
    errors.push(`link : must be valid URL`);
  }


  if (!validator.isNumeric(`${houseObject['price_value']}`)) {
    valid = false;
    errors.push(`price_value: wrongn numeric value `);
  }

  if (!validator.isAlpha(`${houseObject['location_country']}`)) {
    valid = false;
    errors.push(`location_country: wrongn `);
  }

  if (!validator.isAlpha(`${houseObject['location_city']}`)) {
    valid = false;
    errors.push(`price_value: wrongn numeric value `);
  }




  return {
    valid,
    errors,
    raw: houseObject
  };
};

const houseForSqlQuery = houseObject => {
  return requiredFields.map(field => houseObject[field]);
};


module.exports = {
  validHouse,
  houseForSqlQuery,
};
