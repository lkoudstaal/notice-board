(function(noticeController) {

    var assert = require('assert');

    noticeController.init = function(app, database) {

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
                var results = db.notices.find().toArray(function(err, result) {
                    callback(result);
                });
            });
        };
    };

})(module.exports);