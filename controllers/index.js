var noticeController = require("./noticeController.js");

module.exports.init = function (app, database) {
    noticeController.init(app, database);
};