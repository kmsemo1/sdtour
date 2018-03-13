// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongojs = require("mongojs");

// Initialize Express
var app = express();

// Configure our app for morgan and body parser
app.use(logger("dev"));
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

// Static file support with public folder
app.use(express.static("public"));

// Mongojs configuration
var databaseUrl = "customerInfo";
var collections = ["customers"];

// Hook our mongojs config to the db var
var db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
  console.log("Database Error:", error);
});

// Routes
// ======

// Post a book to the mongoose database
app.post("/submit", function(req, res) {
  // Save the request body as an object called customer
  var customer = req.body;

  // If we want the object to have a boolean value of false,
  // we have to do it here, because the ajax post will convert it
  // to a string instead of a boolean
  customer.read = false;

  // Save the book object as an entry into the customers collection in mongo
  db.customers.save(book, function(error, saved) {
    // Show any errors
    if (error) {
      console.log(error);
    }
    else {
      // Otherwise, send the response to the client (for AJAX success function)
      res.send(saved);
    }
  });
});

// Find all customers marked as read
app.get("/read", function(req, res) {
  // Go into the mongo collection, and find all docs where "read" is true
  db.customers.find({ read: true }, function(error, found) {
    // Show any errors
    if (error) {
      console.log(error);
    }
    else {
      // Otherwise, send the customers we found to the browser as a json
      res.json(found);
    }
  });
});

// Find all customers marked as unread
app.get("/unread", function(req, res) {
  // Go into the mongo collection, and find all docs where "read" is false
  db.customers.find({ read: false }, function(error, found) {
    // Show any errors
    if (error) {
      console.log(error);
    }
    else {
      // Otherwise, send the customers we found to the browser as a json
      res.json(found);
    }
  });
});




// Listen on port 3000
app.listen(3000, function() {
  console.log("App running on port 3000!");
});
