$(document).ready(function() {
  $("#scrapeBtn").on("click", function(event) {
    event.preventDefault();
    alert("Boom!");
    scrapeIt();
  });
});

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
