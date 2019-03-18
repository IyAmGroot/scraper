// import { get } from "http";

$(document).ready(function() {
  // $("#scrapeBtn").on("click", function(event) {
  //   event.preventDefault();
  //   // scrapeIt();
  // });

  $(document).on("click", ".btnComment", function(event) {
    event.preventDefault();
    var myId = $(this).attr("data-id");
    console.log(myId);

    getComments(myId);
  });
});

function getComments(articleId) {
  let queryString = "/comments/" + articleId;
  let articleData = { articleId: articleId };

  console.log(queryString);
  $.ajax({
    method: "GET",
    url: queryString
  });
  // $.get.getJSON("/comments/" + myId, function(data) {
  //   console.log(data);
  // });
}

function scrapeIt() {
  // Grab the articles as a json
  console.log("front scrape");
  $.getJSON("/scrape", function(data) {
    console.log(data);
    // For each one
    // for (var i = 0; i < data.length; i++) {
    //   // Display the apropos information on the page
    //   $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
    // }
  });
}
