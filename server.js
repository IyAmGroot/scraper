// Dependencies
var express = require("express");
var mongoose = require("mongoose");
// Require axios and cheerio. This makes the scraping possible
// var axios = require("axios"); //for calling api
// var cheerio = require("cheerio"); //for scraping
var exphbs = require("express-handlebars");

// Initialize Express
var app = express();
var db = require("./models");

// Database configuration
// var databaseUrl = "scraper2";
// var collections = ["scrapedData"];
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/scraper2";

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
require("./routes/htmlRoutes")(app);
// var aRoutes = require("./routes/apiRoutes");
// app.use(hRoutes);
// app.use(aRoutes);

// Connect to the Mongo DB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true }, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("connected");
  }
});
var PORT = process.env.PORT || 3030;
// Listen on port 3030
app.listen(PORT, function() {
  console.log("App running on port 3030!");
});
