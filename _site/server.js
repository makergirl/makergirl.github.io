// var static = require('node-static');
// var fileServer = new static.Server('./');
// require('http').createServer(function(request, response) {
//   request.addListener('end', function() {
//     fileServer.serve(request, response);
//   }).resume();
// }).listen(8080);

var express = require('express');
var app = express();

console.log("Starting server now...");
console.log("Server started, waiting for new connection...");

var MongoClient = require('mongodb').MongoClient;

// Accept JSON
var activityEndpoint = '/api/activity';
app.get(activityEndpoint, function(req, res, next) {
  console.log('Time: ', Date.now());
  console.log('Endpoint: ' +  activityEndpoint);
  next();
}, function (req, res) {
  var data = req.query;

  var resultJSON = {
    'endpoint': activityEndpoint,
    'response': data.activityData
  };

  MongoClient.connect('mongodb://127.0.0.1:27017/activity', function(err, db) {
    if(err) throw err;

    var collection = db.collection('insert_activity_data');
    collection.insert(resultJSON);

    // Locate all the entries using find
    collection.find().toArray(function(err, results) {
      console.dir(resultJSON);
      // Let's close the db
      db.close();
    });
  });

  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(resultJSON, null, 3));
  console.log(JSON.stringify(resultJSON, null, 3));
});

app.listen(8081);
