var express = require('express');
var path = require('path');
var app = express()
var mongoose = require("mongoose");
var Url = require("./model");
var mongoURL = process.env.MONGOLAB_URI || "mongodb://localhost:27017/url-shorten";

//connect to db
mongoose.connect(mongoURL);
mongoose.connection.on('error', function(err){
  console.error('Have err: ' + err);
});
mongoose.connection.once('open',function(){
  console.log("Connect successfully");
});

function validateURL(i){
    var regex = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
    return regex.test(i);
}

app.get('/', function(req, res) {
    var fileName = path.join(__dirname, 'index.html');
    res.sendFile(fileName, function (err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    }
    else {
      console.log('Sent:', fileName);
    }
  });
})

//shortened URL
app.get('/:query', function (req, res) {
  var url = req.params.query;
  var id = parseInt(url, 10);
  
  if(Number.isNaN(id)){
    res.status(404).send("Invalid short URL");
  }
  else {
    Url.find({id: id}, function(err, docs){
      if(err) console.log(err);
      if(docs && docs.length){
        res.redirect(docs[0].url);
      }
      else{
        res.status(404).send("Invalid URL");
      }
    })
  }
})

app.get('/new/:url*',function(req, res) {
    
})

app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
})
