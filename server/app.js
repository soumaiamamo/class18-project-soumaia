const express = require('express');

const cors = require('cors');
const apiRouter = require('./api');

const app = express();
app.use('/api', apiRouter);

app.use(cors());

apiRouter.get("/", function (req, res) {
  res.send("triggered by GET /api/ path");
});

apiRouter.post("/add", function (req, res) {
  res.send("triggered by POST /api/add path");
});






app.use('*', (req, res) => {
  res.status(404).end();
});

module.exports = app;