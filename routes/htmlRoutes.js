var db = require("../models");
var axios = require("axios");
var cheerio = require("cheerio");

module.exports = function(app) {
  //   var router = app.Router();

  app.get("/", function(req, res) {
    console.log("hello");
    var results = [{}];
    results[0].title = "test title";
    results[0].summary = "test summary";
    results[0].articleUrl = "articleUrl";
    results[0].imageUrl = "imgUrl";

    // var hbsObject = {
    //   articles: results
    // };
    console.log(results);
    var articles = results;

    res.render("index", {
      title: "Big Fancy Title",
      articles: results
    });
  });

  app.get("/scrape", function(req, res) {
    //Scrape the site

    axios.get("https://ftw.usatoday.com").then(function(response) {
      var $ = cheerio.load(response.data);

      var results = {};
      // console.log(response.data);
      var i = 0;
      $("article").each(function(i, element) {
        //var imgLink = $(element).find("a").find("img").attr("data-srcset").split(",")[0].split(" ")[0];
        // var title = $(element)
        //   .find("title")
        //   .text();
        // var url = $(element)
        //   .find("href")
        //   .text();
        // // var imgUrl = $(element).find("img");
        // var summary = $(element)
        //   .find("div.content")
        //   .find("p")
        //   .text();
        // console.log(title);
        // i++;
        // console.log(i);
        // results.title = title;
        // results.summary = summary;
        // results.articleUrl = url;
        // // results.imageUrl = imgUrl;
        results.title = "test title";
        results.summary = "test summary";
        results.articleUrl = "articleUrl";
        results.imageUrl = "imgUrl";
      });
      res.send(results);
    });
    // .then(function(resultsDb) {
    //   res.send(resultsDb);
    // });

    //Insert into db
    // res.send("Scrape Complete");
  });
};
