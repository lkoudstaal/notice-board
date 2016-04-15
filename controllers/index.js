(function (controllers) {

    var noticeController = require("./noticeController.js");

    controllers.init = function (app, database) {
        noticeController.init(app, database);
    };

})(module.exports);