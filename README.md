# Scrape This! #
This full stack application scrapes the New York Times main site for articles and saves them in the "Scrape This!" site.  Users then have the ability to add a comment about the article by clicking the Add/Edit Comment button in the list of scraped articles.

## Technical Details ##
### Front End ###
Technologies used include Bootstrap and JQuery for style and logic.  Handlebars.js was used to create the views to display the data.

### Back End ###
Data is stored in a MongoDB database.  Mongoose is used for the ORM and Express is used for routing.  

## Deployment ##
The "Scrape This!" application will be deployed to Heroku.  

## Caveat ##
At the time of deployment, only the scraping functionality is available.  Commenting on the articles is not complete.
