var gulp = require('gulp');
var spawn = require('child_process').spawn;
var node;

gulp.task('default', ['startServer']);

gulp.task('startServer', function() {
    if (node) node.kill();
    node = spawn('node', ['server.js']);
});

var watcher = gulp.watch(['server.js', 'app/*.jsx', 'data/*.js', 'controllers/*.js'], ['startServer']);