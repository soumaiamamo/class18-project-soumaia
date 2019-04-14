const express = require("express");
const bodyParser = require("body-parser");
const apiRouter = require("./api");
const db = require("../DB/db");
const { validHouse } = require("./validation");
const app = express();



app.use(bodyParser.json())

let houseId = 3;


let fakeDB = [
  {
    id: 1,
    price: 5000,
    description: "5 rooms"

  },
  {
    id: 2,
    price: 100000,
    description: "3 rooms"



  }, {
    id: 3,
    price: 30000,
    description: "2 rooms"
  }
]


app.get("/api", apiRouter);

app.get("/houses", function (req, res) {
  res.send(fakeDB);
});


app.post("/houses", async (req, res) => {
  if (!Array.isArray(req.body)) {

    // throw new Error("data should be an array ");
    return res.status(400).json({ error: "data should be an arrays" })


  }
  const processedData = req.body.map((houseObject) => {
    return validHouse(houseObject);
  });

  const validData = [];
  const invalidData = [];

  processedData.foreach(
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

      const houseData = validData.map((el) => { houseAsSqlParams(el.raw) });
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






app.get("/houses/:id", function (req, res) {
  const { id } = req.params;

  const item = fakeDB.find((house) => {
    return house.id === parseInt(id, 10);
  });
  if (item) {
    res.json(item)
  } else {
    res.send("there are no houses with this id ")
  }
})

app.delete("/houses/:id", function (req, res) {

  let { id } = req.params;

  fakeDB = fakeDB.filter((item) => item.id !== parseInt(id, 10))


})


module.exports = app;
