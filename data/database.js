(function (database) {

    var mongodb = require("mongodb");
    var mongoUrl = 'mongodb://localhost:27017/notice-board';
    var theDb = null;

    // Defer connection to database until the first time it is required.
    // Keep database connection open and return the same database 
    // connection to subsequent callers to enable connection pooling 
    // optimisations.
    database.getDb = function (next) {
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

})(module.exports);