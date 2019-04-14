const app = require("./app");

const axios = require('axios');

const PORT = 8080;

const { validHouse } = require("./validation");

function update() {
  axios.get('http://pastebin.com/raw/WQBCgk0W').then((res) => {

    console.log(res.data.map(validHouse));
  }).catch((err) => { console.log(err) })
}

setInterval(update, 60 * 1000);

update();

// const processedData = data.map((houseObject) => {
//   return validHouse(houseObject);
// });
// console.log(processedData);


app.listen(PORT, () => {

  console.log(`app is running at http://localhost:${PORT}`);
});