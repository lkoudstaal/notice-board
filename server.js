var assert = require('assert');
var express = require('express');
var bodyParser = require('body-parser');
var database = require("./data/database.js")
var app = express();

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static('app'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var insertNotice = function(notice, db, callback) {
    db.getDb(function(err, db) {
        db.notices.insertOne(
            notice,
            function(err, result) {
                assert.equal(err, null);
                console.log("Inserted a notice item.");
                callback();
            });
    });
};

app.post('/api/notice', function(req, res) {
    // TODO: Check that req.body is a valid notice.
    insertNotice(req.body, database, function() {
        res.status(200).send("OK");
    });
});

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});

// TODO: Close database connection on server shutdown.