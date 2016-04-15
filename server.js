var express = require('express');
var bodyParser = require('body-parser');
var database = require("./data/database.js");
var controllers = require("./controllers");
var app = express();

app.set('port', (process.env.PORT || 3000));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Include static resource folders.
app.use(express.static(__dirname + "/app"));
app.use(express.static(__dirname + "/public"));

// Additional middleware which will set headers that we need on each request.
app.use(function (req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Disable caching so we'll always get the latest comments.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

// Initialise controllers and map routes.
controllers.init(app, database);

app.listen(app.get('port'), function () {
    console.log('Server started: http://localhost:' + app.get('port') + '/');
});

// TODO: Close database connection on server shutdown.