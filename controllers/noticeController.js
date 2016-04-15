(function (noticeController) {

    noticeController.init = function (app, database) {

        app.get('/', function (req, res) {
            res.sendFile(__dirname + '/app/index.html');
        });

        app.post('/api/notice', function (req, res) {
            // TODO: Check that req.body is a valid notice.
            // TODO: Handle error when insertNotice fails.
            database.insertNotice(req.body, function () {
                res.status(200).send("OK");
            });
        });

        app.get('/api/notices', function (req, res) {
            // TODO: Handle error when findNotices fails.
            database.findNotices(function (results) {
                res.status(200).send(results);
            });
        });
    };

})(module.exports);