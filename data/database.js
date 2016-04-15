(function (database) {

    var assert = require('assert');
    var dateFormat = require('dateformat');
    var mongodb = require('mongodb');
    var mongoUrl = 'mongodb://localhost:27017/notice-board';
    var theDb = null;

    // Defer connection to database until the first time it is required.
    // Keep database connection open and return the same database 
    // connection to subsequent callers to enable connection pooling 
    // optimisations.
    var getDb = function (next) {
        if (theDb) {
            next(null, theDb);
        } else {
            mongodb.MongoClient.connect(mongoUrl, function (err, db) {
                if (err) {
                    next(err, null);
                } else {
                    theDb = {
                        db: db,
                        notices: db.collection("notices")
                    };
                    next(null, theDb);
                }
            });
        }
    }
    
    // TODO: Provide an err parameter for when insert fails.
    database.insertNotice = function (notice, callback) {
        getDb(function (err, db) {
            db.notices.insertOne(
                notice,
                function (err, result) {
                    assert.equal(err, null);
                    callback();
                });
        });
    };

    // TODO: Provide an err parameter for when find fails.
    database.findNotices = function (callback) {
        getDb(function (err, db) {
            assert.equal(err, null);
            db.notices.find().sort({ _id: -1 }).toArray(function (err, result) {
                var transformedResult = result.map(function (obj) {
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

})(module.exports);