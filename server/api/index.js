const apiRouter = require('express').Router();
const bodyParser = require('body-parser');
const db = require('./db');
const { validHouse, houseForSqlQuery } = require('./validation');

const HOUSES_PER_PAGE = 4;

apiRouter.use(bodyParser.json());


const addHousesSql = `replace into houses (
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

apiRouter.post('/houses', async (req, res) => {
  if (!Array.isArray(req.body)) {
    return res.status(400).json({ error: 'Data should be an array' });
  }
  const processedData = req.body.map(validHouse);

  const validData = [];
  const invalidData = [];
  processedData.forEach(elem => {
    if (elem.valid) {
      validData.push(elem);
    } else {
      invalidData.push(elem);
    }
  });
  const report = {
    valid: validData.length,
    invalid: invalidData,
  };
  if (validData.length) {
    try {
      const housesData = validData.map(obj => houseForSqlQuery(obj.raw));
      await db.queryPromise(addHousesSql, [housesData]);
      return res.json(report);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  } else {
    return res.json(report);
  }
});

apiRouter.get('/houses', async (req, res) => {
  let {
    size_rooms = 'all',
    price_min = 0,
    price_max = 1000000,
    location_city = '',

    order = 'location_country_asc',
    page = 1,
  } = req.query;

  price_min = parseInt(price_min, 10);
  if (Number.isNaN(price_min) || price_min < 0) {
    return res
      .status(400)
      .json({ error: `'price_min' should be a positive number` });
  }
  price_max = parseInt(price_max, 10);
  if (Number.isNaN(price_max) || price_max < 0) {
    return res
      .status(400)
      .json({ error: `'price_max' should be a positive number` });
  }
  if (price_max < price_min) {
    return res
      .status(400)
      .json({ error: `'price_max' should be bigger than 'price_min'` });
  }
  page = parseInt(page, 10);
  if (Number.isNaN(page) || page <= 0) {
    return res
      .status(400)
      .json({ error: `'page' should be a positive number` });
  }

  if (['all', '1', '2', '3', '+4'].indexOf(size_rooms) === -1) {
    return res.status(400).json({ error: `'size_rooms' param is wrong` });
  }
  let order_field;
  let order_direction;

  const index = order.lastIndexOf('_');
  if (index > 0) {
    order_field = order.slice(0, index);
    order_direction = order.slice(index + 1);
    if (['asc', 'desc'].indexOf(order_direction) === -1) {
      return res.status(400).json({ error: `'order' param is wrong` });
    }
  } else {
    return res.status(400).json({ error: `'order' param is wrong` });
  }

  const offset = (page - 1) * HOUSES_PER_PAGE;

  const conditions = [`(price_value between ? and ?)`];
  const params = [price_min, price_max];

  if (location_city.length) {
    conditions.push(`location_city = ?`);
    params.push(location_city);
  }
  if (size_rooms === '+4') {
    conditions.push('size_rooms >= ?');
    params.push(+4);
  } else if (size_rooms !== 'all') {
    conditions.push('size_rooms = ?');
    params.push(size_rooms);
  }

  const queryBody = `from houses
  where ${conditions.join(' and ')}`;

  const queryTotal = `
  select count(id) as total ${queryBody}`;

  const queryItems = `
  select * ${queryBody}
  order by ${db.escapeId(order_field, true)} ${order_direction}
  limit ${HOUSES_PER_PAGE}
  offset ${offset}`;

  try {
    const total = await db.queryPromise(queryTotal, params);
    const houses = await db.queryPromise(queryItems, params);
    return res.json({
      total: total[0].total,
      houses,
      pageSize: HOUSES_PER_PAGE,
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

apiRouter.use('*', (req, res) => {
  res.status(404).end();
});

module.exports = apiRouter;
