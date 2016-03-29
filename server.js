var assert = require('assert');
var express = require('express');
var bodyParser = require('body-parser');
var database = require("./data/database.js")
var app = express();

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static('app'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Additional middleware which will set headers that we need on each request.
app.use(function(req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Disable caching so we'll always get the latest comments.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

var insertNotice = function(notice, database, callback) {
    database.getDb(function(err, db) {
        // TODO: Handle case where getDb errors.
        db.notices.insertOne(
            notice,
            function(err, result) {
                assert.equal(err, null);
                console.log("Inserted a notice item.");
                callback();
            });
    });
};

var findNotices = function(database, callback) {
    database.getDb(function(err, db) {
        assert.equal(err, null);
        var results = db.notices.find().toArray(function(err, result) {
            console.log(result);
            callback(result);
        });
    });
};

app.post('/api/notice', function(req, res) {
    // TODO: Check that req.body is a valid notice.
    insertNotice(req.body, database, function() {
        res.status(200).send("OK");
    });
});

app.get('/api/notices', function(req, res) {
    findNotices(database, function(results) {
        console.log('get requested');
        res.status(200).send(results);
    })
});

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});

// TODO: Close database connection on server shutdown.