# Tab Web App
Website for organizing tabs from the web in a list and sharing your list with others.

## Developer environment
### Requirements
- [Node.js](https://nodejs.org/)
- [Bower](http://bower.io/) (Install by running `npm install -g bower`)
- [Heroku toolbelt](https://toolbelt.heroku.com/)

### Setting up a local environment
1. Install npm packages, run `npm install`
  - Also installs the bower front-end packages in client/bower_components
2. Start the server, run `heroku local` (runs npm start with heroku configs)
  - Initializes the local database if it does not exist
  - Runs the app/server at http://localhost:5000
  - Runs a local instance of the app as if it were hosted on heroku ([more info](https://devcenter.heroku.com/articles/heroku-local))
3. Run all database seeders, run `sequelize db:seed:all`
  - Runs all database seeds located in the [server/seeders](../../tree/master/server/seeders) folder
  - This only needs to be run once per database instance unless new seeds are added

#### Testing file uploads
In order to test the upload functionality, you will need to create an Amazon AWS S3 instance.
TODO: Add instructions for creating Amazon AWS S3 instance, privacy settings, etc.
TODO: Add instructions for creating the `.env` heroku app settings configuration file
