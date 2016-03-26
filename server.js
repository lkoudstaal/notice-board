var assert = require('assert');
var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var url = 'mongodb://localhost:27017/notice-board';

var app = express();

app.set('port', (process.env.PORT || 3000));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var insertDocument = function(notice, db, callback) {
    db.collection('notices').insertOne(
        notice, function(err, result) {
            assert.equal(err, null);
            console.log("Inserted a notice board item into the notices collection.");
            callback();
        });
};

app.post('/api/notice', function(req, res) {
    // TODO: Check that req.body is a valid notice. 
    MongoClient.connect(url, function(err, db) {
        assert.equal(err, null);
        insertDocument(req.body, db, function() {
            db.close();
            res.status(200).send("OK");
        });
    });
});

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
