// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that the API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

let date;

app.get("/api", function (req, res) {
  date = new Date(Date.now());
  res.json({unix: date.getTime(), utc: date.toGMTString()});
})

app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date", function (req, res) {
  if (isNaN(Number(req.params.date))) { // check whether the date is in string format
    date = new Date(req.params.date);
  }
  else { // the date is in integer/milliseconds format
    date = new Date(Number(req.params.date));
  }
  
  if (date.toString() === "Invalid Date") { // check whether date is invalid after parsing
    res.json({error: date.toString()});
  }
  else { // the date is valid
    res.json({unix: date.getTime(), utc:date.toGMTString()});
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
