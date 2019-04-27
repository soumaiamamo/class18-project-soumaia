const app = require('./app');
const PORT = 8080;
// const axios = ('axios');
// const { validHouse } = require("./validation");



//to get houses from link : 

// function pastebin() {

//   axios.get('https://pastebin.com/raw/Z6uSUMEy').then((res) => {
//     console.clear();
//     console.log(res.data.map(validHouse));

//   }).catch(error => {
//     console.log({ error: error.message });
//   });


// }

// setInterval(pastebin, 60 * 1000);

// pastebin();

app.listen(PORT, () => {

  console.log(`app is running at http://localhost:${PORT}`);
});


