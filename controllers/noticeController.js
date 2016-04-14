(function(noticeController) {

    var assert = require('assert');
    var dateFormat = require('dateformat');
    var mongodb = require('mongodb');

    noticeController.init = function(app, database) {

        app.get('/', function(req, res) {
            res.sendFile(__dirname + '/app/index.html');
        });

        app.post('/api/notice', function(req, res) {
            // TODO: Check that req.body is a valid notice.
            insertNotice(req.body, database, function() {
                res.status(200).send("OK");
            });
        });

        app.get('/api/notices', function(req, res) {
            findNotices(database, function(results) {
                res.status(200).send(results);
            })
        });

        var insertNotice = function(notice, database, callback) {
            database.getDb(function(err, db) {
                // TODO: Handle case where getDb errors.
                db.notices.insertOne(
                    notice,
                    function(err, result) {
                        assert.equal(err, null);
                        callback();
                    });
            });
        };

        var findNotices = function(database, callback) {
            database.getDb(function(err, db) {
                assert.equal(err, null);
                db.notices.find().sort({ _id: -1 }).toArray(function(err, result) {
                    var transformedResult = result.map(function(obj) {
                        var tObj = {};
                        tObj._id = obj._id;
                        tObj.body = obj.body;
                        tObj.createdAt = dateFormat(mongodb.ObjectId(obj._id).getTimestamp(), "ddd, d mmm yyyy, h:MM TT");
                        return tObj
                    });
                    callback(transformedResult);
                });
            });
        };
    };

})(module.exports);