var noticeboardService = {
    postNotice: function(noticeBody) {
        var notice = { body: noticeBody }
        $.post('http://localhost:3000/api/notice',
            notice,
            function() { console.log('Success'); });
    }
}

noticeboardService.postNotice("This is a test notice from app.jsx.");