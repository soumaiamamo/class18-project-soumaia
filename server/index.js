const app = require("./app");

const axios = require('axios');

const PORT = 8080;

const { validHouse } = require("./validation");

function update() {
  axios.get('http://pastebin.com/raw/WQBCgk0W').then((res) => {

    Console.log(res.data.map(validHouse));
  });
}

setInterval(update, 60 * 1000);

update();

// const processedData = DATA.map((houseObject) => {
//   return validHouse(houseObject);
// });
// console.log(processedData);


app.listen(PORT, () => {

  console.log(`app is running at http://localhost:${PORT}`);
});