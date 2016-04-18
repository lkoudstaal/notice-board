module.exports.init = function (app, database) {
    var noticeController = require("./noticeController.js");
    noticeController.init(app, database);
};