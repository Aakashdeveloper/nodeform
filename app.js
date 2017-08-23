var express = require('express');
var app = express();
var mongodb = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var port = process.env.PORT || 3400;


app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(__dirname + '/public'));
app.set('views', './src/views');
app.set('view engine', 'ejs');
//app.use(express.static(__dirname + '/src/views'));

app.get('/', function(req, res) {
  res.render('index', {
    title: "hello i am here",
  });
});

app.post('/contact',function(req, res) {
      console.log(req.body);
      var url = 'mongodb://localhost:27017/dummyData';
      mongodb.connect(url, function(err, db) {
        var collection = db.collection('users');
        var user = {
           firstName: req.body.firstName,
            lastName: req.body.lastName
        };

        collection.insert(user, function(err, results) {
          res.redirect('/display');
        });

      });

    });

app.get('/display',function(req, res) {
      var url =
      'mongodb://localhost:27017/dummyData';
          mongodb.connect(url, function (err, db) {
            var collection = db.collection('users');
            collection.find({}).toArray(
              function(err,results){
                  res.render('display', {
                    title: "hello i am here",
                    user: results
                  });
              })
          });
    });


app.listen(port, function(err) {

  console.log('running on '+port);
});