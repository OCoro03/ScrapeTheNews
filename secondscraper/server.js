var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var logger = require("morgan");
// var axios = require("axios");

//initialize Express app
var express = require("express");
var app = express();

app.use(logger("dev"));
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(express.static(process.cwd() + "/public"));
//Require set up handlebars
var exphbs = require("express-handlebars");
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");


var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/scraperdb";
mongoose.connect(MONGODB_URI);
// mongoose.connect(
// process.env.MONGODB_URI || "mongodb://scraperdb:Teotihuacan03!@ds031747.mlab.com:31747/heroku_60rxfhlp",
// )
// mongoose.connect("", { useNewUrlParser: true });
// var db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", function() {
//   console.log("Connected to Mongoose!");
// });

var routes = require("./controller/controller.js");
app.use("/", routes);
//Create localhost port
var port = process.env.PORT || 3003;
app.listen(port, function() {
  console.log("Listening on PORT " + port);
});






