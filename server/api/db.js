var mysql = require('mysql');
const { promisify } = require('util');



var db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: "18project",
  port: 3306
});



db.connect(function (error) {
  if (error) throw error;
});


// const queryPromise = promisify(db.query.bind(db));
db.queryPromise = promisify(db.query);

module.exports = db; 
