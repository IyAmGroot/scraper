var db = require("../models");
var axios = require("axios");
var cheerio = require("cheerio");

module.exports = function(app) {
  //   var router = app.Router();

  app.get("/", function(req, res) {
    db.Article.find({ title: { $exists: true } })
      .then(function(dbArticle) {
        res.render("index", {
          title: "Scrape This! - Home",
          articles: dbArticle
        });
      })
      .catch(function(err) {
        res.json(err);
      });
  });
  app.post("/comment", function(req, res) {
    //Logic that was to go here
    // get noteId and create new note and update article if id variable = X otherwise update Note
    // if(note_id = "X"){
    //   db.Note.create()
    //   .then(function(req.body.data) {
    //     db.Article.findOneAndUpdate({"_id": req.body.id})
    //     .then(function(dbArticle){
    //       res.render("index", {
    //         title: "Scrape This! - Home",
    //         articles: dbArticle
    //       });
    //       })
    //     })
    //   })
    //   .catch(function(err) {
    //     console.log(err);
    //   });
    // }
  });

  app.get("/comments/:articleId", function(req, res) {
    //The plan:
    //Find the lone article by its id
    //Get Comment data if it exists
    //Pass the Article & Comment to the comment.handlebars view.
    console.log(req.params.articleId);
    db.Article.findOne({ _id: req.params.articleId })
      .populate("Comment")
      .exec(function(err, dbArticle) {
        if (err) {
          return res.json(err);
        }
        console.log(dbArticle); //I have a valid object here.
        //This is where I get stuck.
        //The comments handlebar view does not display.
        res.render("comments", {
          title: "Scrape This! - Comments",
          comment: dbArticle
        });
      });
    // .then(function(dbArticle) {
    //   console.log(dbArticle);
    //   res.render("comments", {
    //     title: "Scrape This! - Comments",
    //     comment: dbArticle
    //   });
    // })
    // .catch(function(err) {
    //   res.json(err);
    // });
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
