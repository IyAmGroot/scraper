var db = require("../models");
var axios = require("axios");
var cheerio = require("cheerio");

module.exports = function(app) {
  //   var router = app.Router();

  app.get("/", function(req, res) {
    db.Article.find({ title: { $exists: true } })
      .then(function(dbArticle) {
        res.render("index", {
          title: "Big Fancy Title",
          articles: dbArticle
        });
      })
      .catch(function(err) {
        res.json(err);
      });
  });

  app.get("/comments/:id", function(req, res) {
    console.log("comments path");
    db.Comment.find({});
    res.render("comments");
  });

  app.get("/scrape", function(req, res) {
    //Scrape the site
    axios.get("https://www.nytimes.com/").then(function(response) {
      var $ = cheerio.load(response.data);
      var results = [{}];
      $("article").each(function(i, element) {
        var myResults = {};
        var title = $(element)
          .find("h2")
          .text();
        var url = $(element)
          .find("a")
          .attr("href");
        var imgUrl = $(element)
          .find("a")
          .find("img")
          .attr("src");
        var imgUrl2 = $(element)
          .find("figure")
          .find("img")
          .attr("src");
        var summary = $(element)
          .find("p")
          .text();
        console.log(i + " : " + title + " : " + imgUrl2);

        if (typeof imgUrl === "undefined") {
          if (typeof imgUrl2 === "undefined") {
            imgUrl =
              "https://cidco-smartcity.niua.org/wp-content/uploads/2017/08/No-image-found.jpg";
          } else {
            imgUrl = imgUrl2;
          }
        }
        if (typeof summary === "undefined") {
          summary = "No further details.";
        }
        myResults.title = title;
        myResults.summary = summary;
        myResults.articleUrl = url;
        myResults.imageUrl = imgUrl;
        if (!db.Article.findOne({ title: title })) {
          results.push(myResults);
        }
      });
      console.log(results.length);
      //Insert into db
      if (results.length === 1 && typeof results.title === "undefined") {
        //Do not create:  screwy bit of code here that seems to generate a crappy record with null data.
      } else {
        db.Article.create(results)
          .then(function(dbArticle) {
            console.log(dbArticle);
          })
          .catch(function(err) {
            console.log(err);
          });
      }

      res.redirect("/");
    });
  });
};
