var mysql = require('mysql');
// const { promisify } = require('util');
const db = require("../DB/db");


var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: "18project",
  port: 3306
});



// connection.connect(function (error) {
//   if (error) throw error;
// });

// db.quaryPromis = promisify(db.quary);
module.exports = connection
